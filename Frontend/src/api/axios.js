import axios from "axios";
import { useNavigate } from "react-router";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

const authAPI = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await authAPI.post("/users/refresh-tokens");

        return API(originalRequest);
      } catch {
        const navigate = useNavigate();
        navigate("/authentication/login");
      }
    }

    return Promise.reject(error);
  },
);

export default API;
