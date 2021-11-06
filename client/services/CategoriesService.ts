import axios from "./AxiosSettings";
import { CategoriesInterface } from "../interfaces/CategoriesInterfaces";
import { MessageResponseInterface } from "../interfaces/AxiosInterfaces";

class CategoriesService {
  getCategories() {
    return axios.get<CategoriesInterface[]>("/categories");
  }

  createCategory(token: string, formData: CategoriesInterface) {
    return axios.post<MessageResponseInterface>("/categories", { ...formData, _id: undefined }, {
      headers: { Authorization: token }
    });
  }

  updateCategory(token: string, formData: CategoriesInterface) {
    return axios.patch<MessageResponseInterface>(`/categories/${formData._id}`, { ...formData, _id: undefined }, {
      headers: { Authorization: token }
    });
  }

  deleteCategory(token: string, id: string) {
    return axios.delete<MessageResponseInterface>(`/categories/${id}`, {
      headers: { Authorization: token }
    });
  }
}

export default new CategoriesService();