import { createContext, useState, useEffect } from "react";

import AuthService from "../services/auth-service";
import UsersService from "../services/users-service";
import { UsersInterface } from "../interfaces/users-interfaces";
import { ADMINS } from "../constants/index";

interface ProviderStateInterface {
  token: [string, React.Dispatch<React.SetStateAction<string>>];
  user: UsersInterface;
  isLoggedIn: boolean;
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

const userInitialState: UsersInterface = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  isAdmin: false
};

export const UsersContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

export const UsersContextProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UsersInterface>(userInitialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const isLoggedInValue = localStorage.getItem("isLoggedIn");

    if (isLoggedInValue) {
      const getAccesToken = async () => {
        try {
          const { data } = await AuthService.refreshToken();
          setToken(data.accessToken);
          setTimeout(() => getAccesToken, 1000 * 60 * 10);
        } catch (error: any) {
          return alert(error.response?.data.message);
        }
      }

      getAccesToken();
    }
  }, []);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const { data } = await UsersService.getUser(token);
          setIsLoggedIn(true);
          setUser({
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            isAdmin: data.isAdmin
          });
        } catch (error: any) {
          return alert(error.response?.data.message);
        }
      }

      getUser();
    } else if (isLoggedIn) {
      setIsLoggedIn(false); // de rezolvat
      setUser(userInitialState);
    }
  }, [token, callback]);

  const state: ProviderStateInterface = {
    token: [token, setToken],
    user,
    isLoggedIn,
    callback: [callback, setCallback]
  };

  return (
    <UsersContext.Provider value={state}>
      {children}
    </UsersContext.Provider>
  );
}