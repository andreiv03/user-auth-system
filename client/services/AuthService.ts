import http from "./http-common";
import { FormData as RegisterFormData } from "../pages/register";
import { FormData as LoginFormData } from "../pages/login";

type RefreshTokenType = {
  accessToken: string
};

class AuthService {
  // APIs
  register(data: RegisterFormData) {
    return http.post("/register", data);
  }

  login(data: LoginFormData) {
    return http.post("/login", data);
  }

  logout() {
    return http.get("/logout");
  }

  refreshToken() {
    return http.get<RefreshTokenType>("/refresh-token");
  }

  // Helpers
  validateEmail(email: string) {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  }

  passwordStrength(password: string) {
    const length: number = password.length;
    let complexity: number = 0;

    if (password.match(/(?=.*[a-z])/)) complexity += 26;
    if (password.match(/(?=.*[A-Z])/)) complexity += 26;
    if (password.match(/(?=.*[0-9])/)) complexity += 10;
    if (password.match(/([!-\/:-@[-`{-~])/)) complexity += 32;

    const strength: number = Math.floor(Math.log(Math.pow(complexity, length)) / Math.log(2));

    if (strength > 100) return "Very Strong";
    else if (strength > 75) return "Strong";
    else if (strength > 50) return "Medium";
    else return "Weak";
  }
}

export default new AuthService();