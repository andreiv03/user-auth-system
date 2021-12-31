import axios from "./axios";
import type { UserInterface, AccountFormDataInterface, PasswordFormDataInterface } from "../interfaces/user-interfaces";
import type { MessageResponseInterface } from "../interfaces";

class UserServiceClass {
  getUser(token: string) {
    return axios.get<UserInterface>("/user", {
      headers: { Authorization: token }
    });
  }

  updateUser(token: string, id: string, formData: AccountFormDataInterface) {
    return axios.patch<MessageResponseInterface>(`/user/${id}`, formData, {
      headers: { Authorization: token }
    });
  }

  changePassword(token: string, id: string, formData: PasswordFormDataInterface) {
    return axios.patch<MessageResponseInterface>(`/user/password/${id}`, formData, {
      headers: { Authorization: token }
    });
  }
}

const UserService = new UserServiceClass();
export default UserService;