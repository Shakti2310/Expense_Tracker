import Otp from "../models/otp.model.js";
import ApiError from "../utils/ApiError.js";
import { sendEmail } from "./nodemailer.service.js";

const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

const generateOtpEmail = (user, otp) => {
  return {
    subject: "Your Expense Tracker verification code",
    text: ` Hello ${user.name}, Your Expense Tracker verification code is: ${otp} This code will expire within 1 hour. For your security, please do not share this code with anyone. If you did not request this code, you can safely ignore this email. Thanks, Expense Tracker Team `.trim(),
    html: `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Verification Code</title> </head> <body style=" margin: 0; padding: 0; background-color: #f4f4f5; font-family: Arial, Helvetica, sans-serif; "> <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f5; padding: 40px 16px;" > <tr> <td align="center"> <!-- Main Container --> <table width="100%" cellpadding="0" cellspacing="0" border="0" style=" max-width: 520px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7; " > <!-- Header --> <tr> <td style=" padding: 28px 32px; border-bottom: 1px solid #e4e4e7; "> <h1 style=" margin: 0; font-size: 22px; color: #18181b; font-weight: 700; "> Expense Tracker </h1> </td> </tr> <!-- Content --> <tr> <td style="padding: 32px;"> <h2 style=" margin: 0 0 16px 0; font-size: 22px; color: #18181b; "> Verify your account </h2> <p style=" margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #52525b; "> Hello ${user.name}, </p> <p style=" margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #52525b; "> Use the verification code below to continue with your Expense Tracker account. </p> <!-- OTP --> <table width="100%" cellpadding="0" cellspacing="0" border="0" > <tr> <td align="center"> <div style=" display: inline-block; padding: 16px 28px; background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 8px; font-size: 30px; font-weight: 700; letter-spacing: 8px; color: #18181b; "> ${otp} </div> </td> </tr> </table> <p style=" margin: 24px 0 0 0; text-align: center; font-size: 13px; color: #71717a; "> This code expires within 1 hour. </p> <!-- Security Notice --> <div style=" margin-top: 28px; padding: 16px; background-color: #fafafa; border-left: 3px solid #a1a1aa; border-radius: 4px; "> <p style=" margin: 0; font-size: 13px; line-height: 1.6; color: #52525b; "> <strong>Security notice:</strong> Never share this verification code with anyone. Our team will never ask you for your OTP. </p> </div> <p style=" margin: 28px 0 0 0; font-size: 14px; line-height: 1.6; color: #52525b; "> If you didn't request this code, you can safely ignore this email. </p> </td> </tr> <!-- Footer --> <tr> <td style=" padding: 20px 32px; background-color: #fafafa; border-top: 1px solid #e4e4e7; "> <p style=" margin: 0; font-size: 12px; line-height: 1.5; color: #71717a; text-align: center; "> © 2026 Expense Tracker. All rights reserved. </p> </td> </tr> </table> </td> </tr> </table> </body> </html>`.trim(),
  };
};

const sendVerificationOtp = async (user) => {
  try {
    await Otp.deleteOne({ $or: [{ userId: user._id }, { email: user.email }] });

    const otpCode = generateOtp();

    const otp = await Otp.create({
      userId: user._id,
      email: user.email,
      otpHash: otpCode,
    });

    if (!otp) throw new ApiError(500, "Otp not saved");

    const otpEmail = generateOtpEmail(user, otpCode);
    if (!otpEmail) throw new ApiError(500, "error while structuring email");

    await sendEmail(user.email, otpEmail.subject, otpEmail.text, otpEmail.html);

    return otp;
  } catch (error) {
    throw new ApiError(500, "Error saving OTP", error);
  }
};

export default sendVerificationOtp;
