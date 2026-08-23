import Otp from "../models/otp.model.js";
import ApiError from "../utils/ApiError.js";

const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

const generateOtpHtml = (otp) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Your OTP Code</h2>
            <p>Use the following OTP to complete your action:</p>
            <h3>${otp}</h3>
        </div>
    </body>
</html>`;
};

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

export { generateOtp, generateOtpHtml, saveNewOtp };
