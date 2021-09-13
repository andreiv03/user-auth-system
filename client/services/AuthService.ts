import http from "./http-common";
import { FormData as RegisterFormData } from "../pages/register";
import { FormData as LoginFormData } from "../pages/login";

class AuthService {
  register(data: RegisterFormData) {
    return http.post("/register", data);
  }

  login(data: LoginFormData) {
    return http.post("/login", data);
  }

  validateEmail(email: string) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
}

export default new AuthService();