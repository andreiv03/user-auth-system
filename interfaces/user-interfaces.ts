export interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
};

export interface AccountFormDataInterface {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export interface PasswordFormDataInterface {
  currentPassword: string;
  newPassword: string;
};