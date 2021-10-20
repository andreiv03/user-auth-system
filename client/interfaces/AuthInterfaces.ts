export interface RegisterFormDataInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface LoginFormDataInterface {
  email: string;
  password: string;
};

export interface AuthResponseInterface {
  accessToken: string;
};

export interface RefreshTokenResponseInterface {
  accessToken: string
};