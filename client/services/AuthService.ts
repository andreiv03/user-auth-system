import axios from "./AxiosSettings";
import { RegisterFormDataInterface, LoginFormDataInterface, AuthResponseInterface, RefreshTokenResponseInterface } from "../interfaces/AuthInterfaces";

class AuthService {
  // APIs
  register(data: RegisterFormDataInterface) {
    return axios.post<AuthResponseInterface>("/auth/register", data);
  }

  login(data: LoginFormDataInterface) {
    return axios.post<AuthResponseInterface>("/auth/login", data);
  }

  logout() {
    return axios.get<null>("/auth/logout");
  }

  refreshToken() {
    return axios.get<RefreshTokenResponseInterface>("/auth/refresh-token");
  }

  // Helpers
  checkEmailValidity(email: string) {
    const result = email.match(/^[\S^@]+@+[\S^@]+\.+[\S^@]+$/);
    return result ? true : false;
  }

  checkPasswordStrength(password: string) {
    const length = password.length;
    let complexity = 0;

    if (password.match(/(?=.*[a-z])/)) complexity += 26;
    if (password.match(/(?=.*[A-Z])/)) complexity += 26;
    if (password.match(/(?=.*[0-9])/)) complexity += 10;
    if (password.match(/([!-\/:-@[-`{-~])/)) complexity += 32;

    const strength = Math.floor(Math.log(Math.pow(complexity, length)) / Math.log(2));

    if (strength > 100) return "Very Strong";
    else if (strength > 75) return "Strong";
    else if (strength > 50) return "Medium";
    else return "Weak";
  }
}

export default new AuthService();