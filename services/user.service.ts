import { User } from "../context/auth.context";
import axios from "../utils/axios";

class UserService {
  getUser(accessToken: string) {
    return axios.get<User>("/user/get-user", {
      headers: { Authorization: accessToken }
    });
  }
};

const userService = new UserService();
export default userService;