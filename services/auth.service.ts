import axios from "../utils/axios";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

interface LoginFormData {
  email: string;
  password: string;
};

class AuthService {
  register(formData: RegisterFormData) {
    return axios.post<{ accessToken: string }>("/auth/register", formData);
  }

  login(formData: LoginFormData) {
    return axios.post<{ accessToken: string }>("/auth/login", formData);
  }

  logout() {
    return axios.get<null>("/auth/logout");
  }

  refreshToken() {
    return axios.get<{ accessToken: string }>("/auth/refresh-token");
  }
};

const authService = new AuthService();
export default authService;