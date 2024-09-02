import axios from "axios";
import { makeStore } from "../store/store";

const axiosInstance = axios.create({
  baseURL: process.env.VITE_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = makeStore()?.getState()?.user || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
