import api from "./axios.js";
import authApi from "./axios.js";

const getUser = async () => {
  const res = await api.get("/users/current-user");
  return res.data;
};

const registerUser = async (formData) => {
  const res = await authApi.post("/users/register", formData);
  return res.data;
};

const verifyUser = async (formData) => {
  const res = await authApi.post("/users/verify-email", formData);
  return res.data;
};

const resendOtp = async (formData) => {
  const res = await authApi.post("/users/resend-otp", formData);
  return res.data;
};

const loginUser = async (formData) => {
  const res = await authApi.post("/users/login", formData);
  return res.data;
};

const logoutUser = async () => {
  const res = await api.post("/users/logout");
  return res.data;
};

export { registerUser, loginUser, getUser, verifyUser, logoutUser, resendOtp };
