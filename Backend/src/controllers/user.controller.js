import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import User from "../models/user.model.js";
import Otp from "../models/otp.model.js";

import { generateAuthTokens } from "../services/authTokens.service.js";

import fs from "fs";
import jwt from "jsonwebtoken";
import { cookieOptions1d, cookieOptions7d } from "../constants.js";
import { v2 as cloudinary } from "cloudinary";
import sendVerificationOtp from "../services/otp.service.js";
import Category from "../models/category.model.js";
import Expense from "../models/expense.model.js";
import mongoose from "mongoose";

const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

const registerUser = asyncHandler(async (req, res) => {
  // Getting user details from client
  const { username, fullname, email, password } = req.body;

  // Getting the user picture from client
  const dpLocalPath = req.files?.defaultPicture?.[0]?.path;

  try {
    // Checking for picture is provided or not
    if (!dpLocalPath) throw new ApiError(400, "Picture not found");

    // Finding user if already existed
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    // Throwing error if user is existed already
    if (existedUser && existedUser.email === email)
      throw new ApiError(409, "Email is already registered");
    if (existedUser && existedUser.username === username)
      throw new ApiError(409, "User already exists with this username");

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

    const otp = await sendVerificationOtp(user);
    if (!otp) throw new ApiError(500, "Otp sending failed");

    const { accessToken, refreshToken } = await generateAuthTokens(user._id);

    // Sending the response and status code
    return res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions1d)
      .cookie("refreshToken", refreshToken, cookieOptions7d)
      .json(
        new ApiResponse(200, "User registered successfully", {
          user: user._id,
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
          defaultPicture: user.defaultPicture,
        }),
      );
  } finally {
    if (dpLocalPath && fs.existsSync(dpLocalPath)) fs.unlinkSync(dpLocalPath);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // Getting login details from user
  const { username, password } = req.body;

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
  if (!isPasswordValid) throw new ApiError(401, "Incorrect password");

  // Verification Check
  if (!user.isVerified) {
    const otp = await sendVerificationOtp(user);
    if (!otp) throw new ApiError(500, "Otp sending failed");
  }

  // Tokens generated
  const { accessToken, refreshToken } = await generateAuthTokens(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions1d) // sending cookies
    .cookie("refreshToken", refreshToken, cookieOptions7d)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        defaultPicture: user.defaultPicture,
      }),
    );
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

  const email = req.user?.email;

  const otp = await Otp.findOne({ email }, "otpHash");

  if (!otp) throw new ApiError(401, "Email not registered");

  const isOtpValid = await otp.verifyOtp(clientOtp);

  if (!isOtpValid) throw new ApiError(404, "Otp is invalid");

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { isVerified: true } },
        { session },
        { returnDocument: "after" },
      );

      await Otp.deleteOne({ email }, { session });

      if (!updatedUser)
        throw new ApiError(500, "Error updating user verification status");
    });
  } finally {
    await mongoose.endSession;
  }

  return res.status(201).json(new ApiResponse(200, "Email verified"));
});

const updateUser = asyncHandler(async (req, res) => {
  const payload = { ...req?.body };

  try {
    if (req.file) {
      const deleteOldDP = await cloudinary.uploader.destroy(
        req.user.defaultPicture,
      );
      if (!deleteOldDP) throw new ApiError(500, "Cloudinary delete failed");

      const defaultPicture = await cloudinary.uploader.upload(req?.file.path);
      if (!defaultPicture) throw new ApiError(500, "Cloudinary upload failed");

      payload.defaultPicture = defaultPicture.url;
    }

    if (payload.email) payload.isVerified = false;

    const user = await User.findByIdAndUpdate(req.user._id, payload, {
      returnDocument: "after",
    }).select("-password -refreshToken");
    if (!user) throw new ApiError(500, "Profile update failed");

    if (payload.email) {
      const otp = await sendVerificationOtp(user);
      if (!otp) throw new ApiError(500, "Otp sending failed");
    }

    res.status(201).json(new ApiResponse(201, "Profile updated", user));
  } finally {
    if (req?.file.path && fs.existsSync(req?.file.path))
      fs.unlinkSync(req?.file.path);
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(500, "User not found");

  const isPasswordValid = await user.verifyPassword(oldPassword);
  if (!isPasswordValid) throw new ApiError(401, "Incorrect password");

  user.password = newPassword;
  const updatedUser = await user.save();

  if (!updatedUser) throw new ApiError(500, "Password does not changed");

  res.status(201).json(new ApiResponse(201, "Password changed succussfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      await Category.deleteMany({ userId: req.user._id }, { session });

      await Expense.deleteMany({ userId: req.user._id }, { session });

      const deletedUser = await User.findByIdAndDelete(req.user._id, {
        session,
      });
      if (!deletedUser) throw new ApiError(500, "User deletion failed");
    });

    res.status(200).json(new ApiResponse(200, "User deleted successfully"));
  } finally {
    await session.endSession();
  }
});

export {
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
  regenerateAccessToken,
  verifyUser,
  updateUser,
  changePassword,
  deleteUser,
};
