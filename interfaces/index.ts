import type { UserInterface } from "./user-interfaces";
import type { CategoriesInterface } from "./categories-interfaces";

// APIs
export interface MessageResponseInterface {
  message: string;
};

export interface GoogleDriveUploadInterface {
  fileId: string;
  url: string;
};

// Components
export interface AccountPropsInterface {
  token: [string, React.Dispatch<React.SetStateAction<string>>];
  user: UserInterface;
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

export interface SecurityPropsInterface {
  token: [string, React.Dispatch<React.SetStateAction<string>>];
  user: UserInterface;
};

export interface DashboardPropsInterface {
  categories: CategoriesInterface[];
};

export interface DashboardComponentPropsInterface extends DashboardPropsInterface {
  token: [string, React.Dispatch<React.SetStateAction<string>>];
  user: UserInterface;
};