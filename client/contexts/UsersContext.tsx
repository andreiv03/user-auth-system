import React, { createContext, useState, useEffect } from "react";

import AuthService from "../services/AuthService";
import UsersService from "../services/UsersService";
import { UsersInterface } from "../interfaces/UsersInterfaces";

interface ProviderStateInterface {
  token: [string, React.Dispatch<React.SetStateAction<string>>];
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: UsersInterface;
};

const userInitialState: UsersInterface = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  avatarUrl: ""
};

export const UsersContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

const UsersContextProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [callback, setCallback] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<UsersInterface>(userInitialState);

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
          if (UsersService.isAdmin(data.email)) setIsAdmin(true);

          setUser({
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            avatarUrl: data.avatarUrl
          });
        } catch (error: any) {
          return alert(error.response?.data.message);
        }
      }

      getUser();
    }
  }, [token, callback]);

  const state: ProviderStateInterface = {
    token: [token, setToken],
    callback: [callback, setCallback],
    isLoggedIn,
    isAdmin,
    user
  };

  return (
    <UsersContext.Provider value={state}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersContextProvider;