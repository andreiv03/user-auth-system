import React, { createContext, useState, useEffect } from "react";

import AuthService from "../services/AuthService";
import UsersService from "../services/UsersService";

interface UsersInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

interface ProviderStateInterface {
  token: [string, React.Dispatch<React.SetStateAction<string>>];
  isLogged: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  isAdmin: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  user: [UsersInterface | {}, React.Dispatch<React.SetStateAction<UsersInterface | {}>>];
};

const UsersContext: React.Context<ProviderStateInterface | null> = createContext<ProviderStateInterface | null>(null);

const UsersContextProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<UsersInterface | {}>({});

  useEffect(() => {
    const firstLogin: string | null = localStorage.getItem("firstLogin");

    if (firstLogin) {
      const getAccesToken = async (): Promise<void> => {
        try {
          const { data } = await AuthService.refreshToken();
          setToken(data.accessToken);

          setTimeout(() => getAccesToken, 10 * 60 * 1000);
        } catch (error: any) {
          return alert(error.response.data.message);
        }
      }

      getAccesToken();
    }
  }, []);

  useEffect(() => {
    if (token) {
      const getUser = async (): Promise<void> => {
        try {
          const { data } = await UsersService.getUser(token);
          
          setIsLogged(true);
          if (UsersService.isAdmin(data.email)) setIsAdmin(true);

          setUser({
            id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
          });
        } catch (error: any) {
          return alert(error.response.data.message);
        }
      }

      getUser();
    }
  }, [token]);

  const state: ProviderStateInterface = {
    token: [token, setToken],
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser]
  };

  return (
    <UsersContext.Provider value={state}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersContextProvider;