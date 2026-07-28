import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyAccessToken = asyncHandler(async (req, _, next) => {
  try {
    // Getting Access Token from client through cookies or headers
    const accessToken =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    // Error Check: Token is there or not
    if (!accessToken) throw new ApiError(401, "Access token not found");

    // Decoding token
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );

    // Finding User through decoded token
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );

    // Error Check: User exists or not
    if (!user) throw new ApiError(401, "Invalid Access Token");

    // Sending user through request
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
});

const verifyEmailToken = asyncHandler(async (req, _, next) => {
  try {
    const verificationToken =
      req.cookies?.verificationToken ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!verificationToken)
      throw new ApiError(401, "Verification token not found");

    const decodedToken = jwt.verify(
      verificationToken,
      process.env.VERIFICATION_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );

    if (!user) throw new ApiError(401, "Invalid Verification Token");

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired verification token");
  }
});

export { verifyAccessToken, verifyEmailToken };
