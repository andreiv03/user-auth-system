import axios from "axios";

import { AXIOS_HEADERS } from "@/config/constants";
import type { AuthResponse } from "@/types/auth";

const axiosInstance = axios.create({
	headers: AXIOS_HEADERS,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	async (config) => {
		return config;
	},
	(error) => Promise.reject(error),
);

export default axiosInstance;
