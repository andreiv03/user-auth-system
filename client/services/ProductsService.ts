import axios from "./AxiosSettings";
import { ProductsInterface, CategoriesInterface } from "../interfaces/ProductsInterfaces";
import { MessageResponseInterface } from "../interfaces/AxiosInterfaces";

class ProductsService {
  // APIs
  getProducts() {
    return axios.get<ProductsInterface[]>("/products");
  }

  createProduct(token: string, formData: ProductsInterface) {
    return axios.post<MessageResponseInterface>("/products", { ...formData }, {
      headers: { Authorization: token }
    });
  }

  updateProduct(token: string, id: (string | undefined), formData: ProductsInterface) {
    return axios.patch<MessageResponseInterface>(`/products/${id}`, { ...formData }, {
      headers: { Authorization: token }
    });
  }

  deleteProduct(token: string, id: (string | undefined)) {
    return axios.delete<MessageResponseInterface>(`/products/${id}`, {
      headers: { Authorization: token }
    });
  }

  getCategories() {
    return axios.get<CategoriesInterface[]>("/products/categories");
  }

  createCategory(token: string, formData: CategoriesInterface) {
    return axios.post<MessageResponseInterface>("/products/categories", { ...formData }, {
      headers: { Authorization: token }
    });
  }

  updateCategory(token: string, id: (string | undefined), formData: CategoriesInterface) {
    return axios.patch<MessageResponseInterface>(`/products/categories/${id}`, { ...formData }, {
      headers: { Authorization: token }
    });
  }

  deleteCategory(token: string, id: (string | undefined)) {
    return axios.delete<MessageResponseInterface>(`/products/categories/${id}`, {
      headers: { Authorization: token }
    });
  }
}

export default new ProductsService();