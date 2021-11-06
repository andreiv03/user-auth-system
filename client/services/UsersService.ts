import axios from "./AxiosSettings";
import { UsersInterface, AccountFormDataInterface, PasswordFormDataInterface } from "../interfaces/UsersInterfaces";
import { MessageResponseInterface } from "../interfaces/AxiosInterfaces";

class UsersService {
  getUser(token: string) {
    return axios.get<UsersInterface>("/users/account", {
      headers: { Authorization: token }
    });
  }

  updateUser(token: string, id: string, formData: AccountFormDataInterface) {
    return axios.patch<MessageResponseInterface>(`/users/account/${id}`, { ...formData }, {
      headers: { Authorization: token }
    });
  }

  changePassword(token: string, id: string, formData: PasswordFormDataInterface) {
    return axios.patch<MessageResponseInterface>(`/users/account/change-password/${id}`, { ...formData, confirmPassword: undefined }, {
      headers: { Authorization: token }
    });
  }
}

export default new UsersService();