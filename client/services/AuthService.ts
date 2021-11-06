import axios from "./AxiosSettings";
import { RegisterFormDataInterface, LoginFormDataInterface, AuthResponseInterface } from "../interfaces/AuthInterfaces";

class AuthService {
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
    return axios.get<AuthResponseInterface>("/auth/refresh-token");
  }
}

export default new AuthService();