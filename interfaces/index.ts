import type { UserInterface } from "./user-interfaces";
import type { CategoriesInterface } from "./categories-interfaces";

export interface MessageResponseInterface {
  message: string;
};

export interface FileUploadInterface {
  publicId: string;
  url: string;
};

// Components
export interface AccountComponentPropsInterface {
  token: string;
  user: UserInterface;
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

export interface SecurityComponentPropsInterface {
  token: string;
  user: UserInterface;
};

export interface ProductsComponentPropsInterface {
  token: string;
  categories: CategoriesInterface[];
};

export interface CategoriesComponentPropsInterface {
  token: string;
  categories: CategoriesInterface[];
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};