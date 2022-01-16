import { createContext, useState, useEffect } from "react";

import AuthService from "../services/auth-service";
import UserService from "../services/user-service";
import type { UserInterface } from "../interfaces/user-interfaces";

interface ProviderStateInterface {
  token: [string, React.Dispatch<React.SetStateAction<string>>];
  user: [UserInterface, React.Dispatch<React.SetStateAction<UserInterface>>];
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

export const userInitialState: UserInterface = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  isAdmin: false,
  avatar: {
    fileId: "",
    url: ""
  }
};

export const UserContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

export const UserProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserInterface>(userInitialState);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated) return;

    const getAccesToken = async () => {
      try {
        const { data } = await AuthService.refreshToken();
        setToken(data.accessToken);
        setTimeout(() => getAccesToken, 60 * 10); // 10 minutes
      } catch (error: any) {
        return alert(error.response.data.message);
      }
    }

    getAccesToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const getUser = async () => {
      try {
        const { data } = await UserService.getUser(token);
        setUser(data);
      } catch (error: any) {
        return alert(error.response.data.message);
      }
    }

    getUser();
  }, [token, callback]);

  const state: ProviderStateInterface = {
    token: [token, setToken],
    user: [user, setUser],
    callback: [callback, setCallback]
  };

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  );
}