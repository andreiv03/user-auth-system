export interface UsersInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
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
  confirmPassword: string;
};