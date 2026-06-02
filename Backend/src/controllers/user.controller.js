import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { generateOtp, generateOtpHtml } from "../utils/otpHandler.js";
import User from "../models/user.model.js";
import Otp from "../models/otp.model.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../constants.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import sendEmail from "../configs/nodemailer.config.js";

const generateJWT = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    await user.updateOne({ refreshToken: refreshToken });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Token generation error: ", error);
  }
};

const getUsers = asyncHandler(async (_, res) => {
  const allUsers = await User.find({});
  res.status(200).json(new ApiResponse(200, "All users fetched", allUsers));
});

const registerUser = asyncHandler(async (req, res) => {
  // Getting user details from client
  const { username, fullname, email, password } = req.body;

  // Getting the user picture from client
  const dpLocalPath = req.files?.defaultPicture?.[0]?.path;

  try {
    // Checking any data is missing or not
    if ([username, fullname, email, password].some((item) => !item?.trim()))
      throw new ApiError(400, "Details missing");

    // Finding user if already existed
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    // Throwing error if user is existed already
    if (existedUser) throw new ApiError(409, "User already existed");

    // Checking for picture is provided or not
    if (!dpLocalPath) throw new ApiError(400, "Picture not found");

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

    const createdUser = await User.findById(
      user._id,
      "-password -refreshToken",
    );

    if (!createdUser) throw new ApiError(500, "User not registered");

    const otpCode = generateOtp();

    const otp = await Otp.create({
      userId: createdUser._id,
      email: createdUser.email,
      otpHash: otpCode,
    });

    if (!otp) throw new ApiError(500, "Otp not saved");

    const otpHtml = generateOtpHtml(otpCode);

    await sendEmail(
      email,
      "Email Verification",
      `Your OTP is ${otpCode}`,
      otpHtml,
    );

    // Sending the response and status code
    return res
      .status(201)
      .json(new ApiResponse(200, "User registered successfully", createdUser));
  } finally {
    fs.unlinkSync(dpLocalPath);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // Getting login details from user
  const { username, password } = req.body;

  // Checking data missing or not
  if (!username || !password)
    throw new ApiError(400, "username and password are required");

  // Finding user instance in database
  const user = await User.findOne({ username }, "username password");

  // Checking user found of not as per client request
  if (!user) throw new ApiError(404, "user not found");

  // Checking user password
  const isPasswordValid = await user.verifyPassword(password);

  // Error if password is wrong
  if (!isPasswordValid) throw new ApiError(401, "Invalid password");

  // Verification Check
  if (!user.isVerified)
    throw new ApiError(403, "Verify your email before login");

  // Tokens generated
  const { accessToken, refreshToken } = await generateJWT(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions) // sending cookies
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, { user }, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  // Removing refresh token from DB
  await User.findByIdAndUpdate(req.user._id, {
    $unset: { refreshToken: 1 },
  });

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions) // Removing tokens from cookies
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, "User logged out successfully"));
});

const regenerateJWT = asyncHandler(async (req, res) => {
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

  const { accessToken, refreshToken } = await generateJWT(user._id);

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, "Access Token refreshed"));
});

const emailVerification = asyncHandler(async (req, res) => {
  const { email, clientOtp } = req.body;

  if (!email || !clientOtp)
    throw new ApiError(400, "email and otp is required");

  const otp = await Otp.findOne({ email }, "otpHash");

  if (!otp) throw new ApiError(401, "Email not registered");

  const isOtpValid = await otp.verifyOtp(clientOtp);

  if (!isOtpValid) throw new ApiError(404, "Otp is invalid");

  return res.status(201).json(new ApiResponse(200, "Email verified"));
});

export {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
  regenerateJWT,
  emailVerification,
};
