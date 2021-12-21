import axios from "./axios";
import { UsersInterface, AccountFormDataInterface, PasswordFormDataInterface } from "../interfaces/users-interfaces";
import { MessageResponseInterface } from "../interfaces/interfaces";

class UsersService {
  getUser(token: string) {
    return axios.get<UsersInterface>("/users", {
      headers: { Authorization: token }
    });
  }

  updateUser(token: string, id: string, formData: AccountFormDataInterface) {
    return axios.patch<MessageResponseInterface>(`/users/${id}`, formData, {
      headers: { Authorization: token }
    });
  }

  changePassword(token: string, id: string, formData: PasswordFormDataInterface) {
    return axios.patch<MessageResponseInterface>(`/users/password/${id}`, formData, {
      headers: { Authorization: token }
    });
  }
}

export default new UsersService();