import React, { createContext, useState, useEffect } from "react";

import ProductsService from "../services/ProductsService";
import { ProductsInterface } from "../interfaces/ProductsInterfaces";

interface ProviderStateInterface {
  products: ProductsInterface;
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

const productsInitialState: ProductsInterface = {
  sku: "",
  name: "",
  description: "",
  price: 0
};

export const ProductsContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

const ProductsContextProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<ProductsInterface>(productsInitialState);
  const [callback, setCallback] = useState<boolean>(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        
      } catch (error: any) {
        return alert(error.response.data.message);
      }
    }

    getProducts();
  }, []);

  const state: ProviderStateInterface = {
    products,
    callback: [callback, setCallback]
  };

  return (
    <ProductsContext.Provider value={state}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContextProvider;