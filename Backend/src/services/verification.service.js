import Otp from "../models/otp.model.js";
import { saveNewOtp } from "./otp.service.js";
import { sendEmail } from "./nodemailer.service.js";
import ApiError from "../utils/ApiError.js";

const initiateEmailVerification = async (user) => {
  // Delete previous OTP if it exists
  await Otp.deleteOne({ email: user.email });

  // Generate & save new OTP
  const { otp, otpCode, otpHtml } = await saveNewOtp(user);

  // Generate verification token
  const verificationToken = await otp.generateVerificationToken();

  if (!verificationToken) {
    throw new ApiError(500, "Verification token not generated");
  }

  // Send email
  await sendEmail(
    user.email,
    "Email Verification",
    `Your OTP is ${otpCode}`,
    otpHtml,
  );

  return verificationToken;
};

export { initiateEmailVerification };
