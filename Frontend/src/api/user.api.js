import API from "./axios.js";
import authAPI from "./axios.js";

const registerUser = async (formData) => {
  const res = await authAPI.post("/users/register", formData);
  return res.data;
};

const loginUser = async (formData) => {
  const res = await authAPI.post("/users/login", formData);
  return res.data;
};

const getUser = async () => {
  const res = await authAPI.get("/users/current-user");
  return res.data;
}

export { registerUser, loginUser, getUser };
