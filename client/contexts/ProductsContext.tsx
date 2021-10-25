import React, { createContext, useState, useEffect } from "react";

import ProductsService from "../services/ProductsService";
import { ProductsInterface, CategoriesInterface } from "../interfaces/ProductsInterfaces";

interface ProviderStateInterface {
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  products: ProductsInterface[];
  categories: CategoriesInterface[];
};

const productsInitialState: ProductsInterface[] = [{
  sku: "",
  name: "",
  description: "",
  price: "",
  category: ""
}];

const categoriesInitialState: CategoriesInterface[] = [{
  name: "",
  parent: ""
}];

export const ProductsContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

const ProductsContextProvider: React.FC = ({ children }) => {
  const [callback, setCallback] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductsInterface[]>(productsInitialState);
  const [categories, setCategories] = useState<CategoriesInterface[]>(categoriesInitialState);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await ProductsService.getProducts();
        setProducts(data);
      } catch (error: any) {
        return alert(error.response.data.message);
      }
    }

    const getCategories = async () => {
      try {
        const { data } = await ProductsService.getCategories();
        setCategories(data);
      } catch (error: any) {
        return alert(error.response.data.message);
      }
    }

    getProducts();
    getCategories();
  }, [callback]);

  const state: ProviderStateInterface = {
    callback: [callback, setCallback],
    products,
    categories
  };

  return (
    <ProductsContext.Provider value={state}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContextProvider;