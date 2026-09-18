import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import OtpForm from "../../components/auth/OtpForm";
import Loader from "../../components/customUI/Loader/";
import { useResendOtp, useVerifyUser } from "@/hooks/useAuthUser";

function EmailVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const { isPending, mutate } = useVerifyUser();

  const { mutate: resendOtpMutation } = useResendOtp();

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    mutate({ clientOtp: otpCode });
  };

  const handleResend = () => {
    resendOtpMutation();
    toast.info("OTP resent to your email");
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return isPending ? (
    <Loader text="Verifying your email..." />
  ) : (
    <OtpForm
      otp={otp}
      setOtp={setOtp}
      inputRefs={inputRefs}
      handleInputChange={handleInputChange}
      handleKeyDown={handleKeyDown}
      handleSubmit={handleSubmit}
      handleResend={handleResend}
      isPending={isPending}
    />
  );
}

export default EmailVerification;
