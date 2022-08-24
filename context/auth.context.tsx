import { createContext, useEffect, useState } from "react";

export interface User {
  _id: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  updatedAt: string;
};

interface ContextState {
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  token: [string, React.Dispatch<React.SetStateAction<string>>];
  user: [User, React.Dispatch<React.SetStateAction<User>>];
};

export const userInitialState: User = {
  _id: "",
  createdAt: "",
  email: "",
  firstName: "",
  lastName: "",
  updatedAt: ""
};

export const AuthContext = createContext<ContextState>({} as ContextState);

export const AuthContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [callback, setCallback] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User>(userInitialState);

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated) return;

    const getAccesToken = async () => {
      try {
        const { default: authService } = await import("../services/auth.service");
        const { data } = await authService.refreshToken();
        
        setToken(data.accessToken);
        setTimeout(() => getAccesToken, 60 * 10); // 10 minutes
      } catch (error: any) {
        alert(error.response.data.message);
      }
    }

    getAccesToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const getUser = async () => {
      try {
        const { default: userService } = await import("../services/user.service");
        const { data } = await userService.getUser(token);
        setUser(data);
      } catch (error: any) {
        alert(error.response.data.message);
      }
    }

    getUser();
  }, [token, callback]);

  const state: ContextState = {
    callback: [callback, setCallback],
    token: [token, setToken],
    user: [user, setUser]
  };

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}