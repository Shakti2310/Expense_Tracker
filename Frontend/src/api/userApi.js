import API from "./axios";

const registerUser = async (formData) => {
  const res = await API.post("/user/register", formData);
  return res.data;
};

export { registerUser };
