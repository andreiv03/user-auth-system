export interface ProductsInterface {
  _id: string;
  sku: string;
  name: string;
  description: string;
  price: string;
  category: string;
};

export interface ProductFormDataInterface {
  sku: string;
  name: string;
  description: string;
  price: string;
  category: string;
};