import type { UserInterface } from "./user-interfaces";
import type { CategoriesInterface } from "./categories-interfaces";

export interface MessageResponseInterface {
  message: string;
};

export interface FileUploadInterface {
  fileId: string;
  url: string;
};

// Components
export interface AccountPropsInterface {
  token: string;
  user: UserInterface;
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

export interface SecurityPropsInterface {
  token: string;
  user: UserInterface;
};

export interface ProductsPropsInterface {
  token: string;
  categories: CategoriesInterface[];
};

export interface CategoriesPropsInterface {
  token: string;
  categories: CategoriesInterface[];
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};