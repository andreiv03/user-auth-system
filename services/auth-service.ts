import axios from "./axios";
import type { RegisterFormDataInterface, LoginFormDataInterface, AuthResponseInterface } from "../interfaces/auth-interfaces";

class AuthServiceClass {
  register(formData: RegisterFormDataInterface) {
    return axios.post<AuthResponseInterface>("/auth/register", formData);
  }

  login(formData: LoginFormDataInterface) {
    return axios.post<AuthResponseInterface>("/auth/login", formData);
  }

  logout() {
    return axios.get<void>("/auth/logout");
  }

  refreshToken() {
    return axios.get<AuthResponseInterface>("/auth/refresh-token");
  }
}

const AuthService = new AuthServiceClass();
export default AuthService;