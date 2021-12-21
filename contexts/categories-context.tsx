import { createContext, useState, useEffect } from "react";

import CategoriesService from "../services/categories-service";
import { CategoriesInterface } from "../interfaces/categories-interfaces";

interface ProviderStateInterface {
  categories: CategoriesInterface[];
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

const categoriesInitialState: CategoriesInterface[] = [{
  _id: "",
  name: "",
  parent: ""
}];

export const CategoriesContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

export const CategoriesContextProvider: React.FC = ({ children }) => {
  const [categories, setCategories] = useState<CategoriesInterface[]>(categoriesInitialState);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await CategoriesService.getCategories();
        setCategories(data);
      } catch (error: any) {
        return alert(error.response.data.message);
      }
    }

    getCategories();
  }, [callback]);

  const state: ProviderStateInterface = {
    categories,
    callback: [callback, setCallback]
  };

  return (
    <CategoriesContext.Provider value={state}>
      {children}
    </CategoriesContext.Provider>
  );
}