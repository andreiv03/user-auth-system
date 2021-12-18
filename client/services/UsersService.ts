import axios from "./AxiosSettings";
import { UsersInterface, AccountFormDataInterface, PasswordFormDataInterface } from "../interfaces/UsersInterfaces";
import { MessageResponseInterface } from "../interfaces/AxiosInterfaces";

class UsersService {
  getUser(token: string) {
    return axios.get<UsersInterface>("/users/user", {
      headers: { Authorization: token }
    });
  }

  updateAccount(token: string, id: string, formData: AccountFormDataInterface) {
    return axios.patch<MessageResponseInterface>(`/users/account/${id}`, formData, {
      headers: { Authorization: token }
    });
  }

  changePassword(token: string, id: string, formData: PasswordFormDataInterface) {
    return axios.patch<MessageResponseInterface>(`/users/change-password/${id}`, formData, {
      headers: { Authorization: token }
    });
  }
}

export default new UsersService();