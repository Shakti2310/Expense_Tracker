import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { cookieOptions1d } from "../constants.js";
import { initiateEmailVerification } from "../services/verification.service.js";

const resendOtp = asyncHandler(async (req, res) => {
  // Check if already verified
  if (req.user.isVerified) throw new ApiError(400, "User is already verified");

  const verificationToken = await initiateEmailVerification(req.user);

  return res
    .status(200)
    .cookie("verificationToken", verificationToken, cookieOptions1d)
    .json(new ApiResponse(200, "OTP resent to your email"));
});

export { resendOtp };
