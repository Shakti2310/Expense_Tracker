import { generateOtp, generateOtpHtml } from "../utils/otpHandler.js";
import Otp from "../models/otp.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const saveNewOtp = async (user) => {
  try {
    const otpCode = generateOtp();

    const otp = await Otp.create({
      userId: user._id,
      email: user.email,
      otpHash: otpCode,
    });

    if (!otp) throw new ApiError(500, "Otp not saved");

    const otpHtml = generateOtpHtml(otpCode);

    return { otp, otpCode, otpHtml };
  } catch (error) {
    throw new ApiError(500, "Error saving OTP", error);
  }
};

const resendOtp = asyncHandler(async (req, res) => {
  try {
    const user = req.user;

    const { otp, otpCode, otpHtml } = await saveNewOtp(user);

    const newOtp = await Otp.findOneAndUpdate(
      { userId: user._id },
      { $set: { otpHash: otpCode } },
      { new: true },
    );

    if (!newOtp) throw new ApiError(500, "Otp not updated");
  } catch (error) {
    throw new ApiError(500, "Error resending OTP", error);
  }

  return res.status(200).json(new ApiResponse(200, "Otp resent"));
});

export { saveNewOtp, resendOtp };
