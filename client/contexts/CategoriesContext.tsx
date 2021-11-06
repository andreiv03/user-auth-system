import { createContext, useState, useEffect } from "react";

import CategoriesService from "../services/CategoriesService";
import { CategoriesInterface } from "../interfaces/CategoriesInterfaces";

interface ProviderStateInterface {
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  categories: CategoriesInterface[];
};

const categoriesInitialState: CategoriesInterface[] = [{
  _id: "",
  name: "",
  parent: ""
}];

export const CategoriesContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

export const CategoriesContextProvider: React.FC = ({ children }) => {
  const [callback, setCallback] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoriesInterface[]>(categoriesInitialState);

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
    callback: [callback, setCallback],
    categories
  };

  return (
    <CategoriesContext.Provider value={state}>
      {children}
    </CategoriesContext.Provider>
  );
}