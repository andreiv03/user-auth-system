import axios from "axios";

import { AXIOS_HEADERS } from "@/config/constants";
import { type AuthResponse } from "@/types/auth";

const axiosInstance = axios.create({
  headers: AXIOS_HEADERS,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url?.startsWith("/api/auth/refresh-token")) {
      return config;
    }

    if (config.url?.startsWith("/api/auth/login") || config.url?.startsWith("/api/auth/register")) {
      return config;
    }

    const { data } = await axios.post<AuthResponse>("/api/auth/refresh-token");
    if (data.error) {
      return Promise.reject(new axios.Cancel(data.error));
    }

    config.headers.Authorization = `Bearer ${data.accessToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
