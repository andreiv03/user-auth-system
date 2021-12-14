import axios from "./AxiosSettings";
import { RegisterFormDataInterface, LoginFormDataInterface, AuthResponseInterface } from "../interfaces/AuthInterfaces";

class AuthService {
  register(formData: RegisterFormDataInterface) {
    return axios.post<AuthResponseInterface>("/auth/register", formData);
  }

  login(formData: LoginFormDataInterface) {
    return axios.post<AuthResponseInterface>("/auth/login", formData);
  }

  logout() {
    return axios.get<null>("/auth/logout");
  }

  refreshToken() {
    return axios.get<AuthResponseInterface>("/auth/refresh-token");
  }
}

export default new AuthService();