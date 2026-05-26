import API from "./axios";

const registerUser = async (formData) => {
  const res = await API.post("/user/register", formData);
  return res.data;
};

const loginUser = async (formData) => {
  const res = await API.post("/user/login", formData);
  return res.data;
};

export { registerUser, loginUser };
