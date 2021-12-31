import axios from "./axios";
import type { CategoriesInterface, CategoryFormDataInterface } from "../interfaces/categories-interfaces";
import type { MessageResponseInterface } from "../interfaces";

class CategoriesServiceClass {
  getCategories() {
    return axios.get<CategoriesInterface[]>("/categories");
  }

  createCategory(token: string, formData: CategoryFormDataInterface) {
    return axios.post<MessageResponseInterface>("/categories", formData, {
      headers: { Authorization: token }
    });
  }

  updateCategory(token: string, id: string, formData: CategoryFormDataInterface) {
    return axios.patch<MessageResponseInterface>(`/categories/${id}`, formData, {
      headers: { Authorization: token }
    });
  }

  deleteCategory(token: string, id: string) {
    return axios.delete<MessageResponseInterface>(`/categories/${id}`, {
      headers: { Authorization: token }
    });
  }
}

const CategoriesService = new CategoriesServiceClass();
export default CategoriesService;