import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendVerificationOtp from "../services/otp.service.js";

const resendOtp = asyncHandler(async (req, res) => {
  // Check if already verified
  if (req.user.isVerified) throw new ApiError(400, "User is already verified");

  const otp = sendVerificationOtp(req.user);
  if (!otp) throw new ApiError(500, "Otp sending failed");

  return res.status(200).json(new ApiResponse(200, "OTP resent to your email"));
});

export { resendOtp };
