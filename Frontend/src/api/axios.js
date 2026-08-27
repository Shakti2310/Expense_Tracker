import axios from "axios";
import { router } from "../main";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

const authApi = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await authApi.post("/users/refresh-tokens");
        return api(originalRequest);
      } catch {
        router.navigate("/");
      }
    }

    return Promise.reject(error);
  },
);

export default api;