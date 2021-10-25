import axios from "./AxiosSettings";
import { UsersInterface, AccountFormDataInterface, PasswordFormDataInterface } from "../interfaces/UsersInterfaces";
import { MessageResponseInterface } from "../interfaces/AxiosInterfaces";

class UsersService {
  // APIs
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

  // Helpers
  isAdmin(email: string) {
    const admins = ["andrei.voicu110@gmail.com"];
    return admins.includes(email);
  }

  checkPhoneNumberValidity(phoneNumber: string) {
    const result = phoneNumber.match(/^(\(\d{3}\)|\d{3})-?\d{3}-?\d{4}$/);
    return result ? true : false;
  }
}

export default new UsersService();