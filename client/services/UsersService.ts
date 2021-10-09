import http from "./http-common";

interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

class UsersService {
  // APIs
  getUser(token: string) {
    return http.get<UserInterface>("/account", {
      headers: { Authorization: token }
    });
  }

  // Helpers
  isAdmin(email: string) {
    const admins: string[] = ["andrei.voicu110@gmail.com"];
    return admins.includes(email);
  }
}

export default new UsersService();