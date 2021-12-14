export interface CategoriesInterface {
  _id: string;
  name: string;
  parent: string;
};

export interface CategoryFormDataInterface {
  name: string;
  parent: string;
};

export interface CategoryUpdateInterface {
  id: string;
  name: string;
};