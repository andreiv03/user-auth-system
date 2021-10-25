export interface ProductsInterface {
  _id?: string;
  sku: string;
  name: string;
  description: string;
  price: string;
  category: string;
};

export interface CategoriesInterface {
  _id?: string;
  name: string;
  parent: string;
};