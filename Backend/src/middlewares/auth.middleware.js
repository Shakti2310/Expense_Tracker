import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyAccessToken = asyncHandler(async (req, _, next) => {
  // Getting Access Token from client through cookies or headers
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization").replace("Bearer ", "");

  // Error Check: Token is there or not
  if (!accessToken) throw new ApiError(400, "Access token not found");

  // Decoding token
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  // Finding User through decoded token
  const user = await User.findByIdAndUpdate(decodedToken?._id);

  // Error Check: User exists or not
  if (!user) throw new ApiError(400, "Invalid Access Token");

  // Sending user through request
  req.user = user;
  next();
});