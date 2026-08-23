import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import User from "../models/user.model.js";
import Otp from "../models/otp.model.js";

import { generateAuthTokens } from "../services/authTokens.service.js";
import { initiateEmailVerification } from "../services/verification.service.js";

import fs from "fs";
import jwt from "jsonwebtoken";
import { cookieOptions1d, cookieOptions7d } from "../constants.js";
import { v2 as cloudinary } from "cloudinary";

const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

const registerUser = asyncHandler(async (req, res) => {
  // Getting user details from client
  const { username, fullname, email, password } = req.body;

  // Getting the user picture from client
  const dpLocalPath = req.files?.defaultPicture?.[0]?.path;

  // Checking any data is missing or not
  if ([username, fullname, email, password].some((item) => !item?.trim()))
    throw new ApiError(400, "Details missing");

  // Checking for picture is provided or not
  if (!dpLocalPath) throw new ApiError(400, "Picture not found");

  // Finding user if already existed
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  // Throwing error if user is existed already
  if (existedUser) throw new ApiError(409, "User already existed");

  // Uploading dp to Cloudinary
  const defaultPicture = await cloudinary.uploader.upload(dpLocalPath, {
    resource_type: "auto",
  });

  // Checking does it uploaded or not
  if (!defaultPicture) throw new ApiError(500, "Cloudinary upload error");

  const user = await User.create({
    username: username.trim().toLowerCase(),
    role: "user",
    fullname,
    email,
    password,
    defaultPicture: defaultPicture.url,
  });

  const verificationToken = await initiateEmailVerification(user);

  if (!verificationToken)
    throw new ApiError(500, "Verification token not generated");

  if (dpLocalPath && fs.existsSync(dpLocalPath)) fs.unlinkSync(dpLocalPath);

  // Sending the response and status code
  return res
    .status(201)
    .cookie("verificationToken", verificationToken, cookieOptions1d)
    .json(new ApiResponse(200, "User registered successfully", user));
});

const loginUser = asyncHandler(async (req, res) => {
  // Getting login details from user
  const { username, password } = req.body;

  // Checking data missing or not
  if (!username || !password)
    throw new ApiError(400, "username and password are required");

  // Finding user instance in database
  const user = await User.findOne(
    { username },
    "username password isVerified email",
  );

  // Checking user found of not as per client request
  if (!user) throw new ApiError(404, "user not found");

  // Checking user password
  const isPasswordValid = await user.verifyPassword(password);

  // Error if password is wrong
  if (!isPasswordValid) throw new ApiError(401, "Invalid password");

  // Verification Check
  if (!user.isVerified) {
    const verificationToken = await initiateEmailVerification(user);
    return res
      .status(403)
      .cookie("verificationToken", verificationToken, cookieOptions1d)
      .json(new ApiResponse(403, "Please verify your email address"));
  }

  // Tokens generated
  const { accessToken, refreshToken } = await generateAuthTokens(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions1d) // sending cookies
    .cookie("refreshToken", refreshToken, cookieOptions7d)
    .json(new ApiResponse(200, { user }, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  // Removing refresh token from DB
  await User.findByIdAndUpdate(req.user._id, {
    $unset: { refreshToken: 1 },
  });

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions1d) // Removing tokens from cookies
    .clearCookie("refreshToken", cookieOptions7d)
    .json(new ApiResponse(200, "User logged out successfully"));
});

const regenerateAccessToken = asyncHandler(async (req, res) => {
  const clientRefreshToken =
    req?.cookies?.refreshToken || req?.body?.refreshToken;

  if (!clientRefreshToken) throw new ApiError(401, "Refresh token required");

  const decodedToken = jwt.verify(
    clientRefreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );

  const user = await User.findById(decodedToken?._id);

  if (!user) throw new ApiError(401, "Invalid Refresh Token");

  if (user?.refreshToken !== clientRefreshToken)
    throw new ApiError(401, "Refresh Token expired or used");

  const { accessToken, refreshToken } = await generateAuthTokens(user._id);

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions1d)
    .cookie("refreshToken", refreshToken, cookieOptions7d)
    .json(new ApiResponse(200, "Access Token refreshed"));
});

const verifyUser = asyncHandler(async (req, res) => {
  const { clientOtp } = req.body;

  if (!clientOtp) throw new ApiError(400, "Otp is required");

  const email = req.user?.email;

  const otp = await Otp.findOne({ email }, "otpHash");

  if (!otp) throw new ApiError(401, "Email not registered");

  const isOtpValid = await otp.verifyOtp(clientOtp);

  if (!isOtpValid) throw new ApiError(404, "Otp is invalid");

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { isVerified: true } },
    { returnDocument: "after" },
  );

  if (!updatedUser)
    throw new ApiError(500, "Error updating user verification status");

  await Otp.deleteOne({ email });

  const { accessToken, refreshToken } = await generateAuthTokens(
    updatedUser._id,
  );

  return res
    .status(201)
    .clearCookie("verificationToken", cookieOptions1d)
    .cookie("accessToken", accessToken, cookieOptions1d)
    .cookie("refreshToken", refreshToken, cookieOptions7d)
    .json(new ApiResponse(200, "Email verified"));
});

export {
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
  regenerateAccessToken,
  verifyUser,
};
