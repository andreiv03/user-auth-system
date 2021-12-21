import axios from "./axios";
import { ProductsInterface, ProductFormDataInterface } from "../interfaces/products-interfaces";
import { MessageResponseInterface, GoogleDriveUploadInterface } from "../interfaces/interfaces";

class ProductsService {
  getProducts() {
    return axios.get<ProductsInterface[]>("/products");
  }

  createProduct(token: string, formData: ProductFormDataInterface, image: GoogleDriveUploadInterface) {
    return axios.post<MessageResponseInterface>("/products", { ...formData, image }, {
      headers: { Authorization: token }
    });
  }

  updateProduct(token: string, id: string, formData: ProductFormDataInterface) {
    return axios.patch<MessageResponseInterface>(`/products/${id}`, formData, {
      headers: { Authorization: token }
    });
  }

  deleteProduct(token: string, id: string) {
    return axios.delete<MessageResponseInterface>(`/products/${id}`, {
      headers: { Authorization: token }
    });
  }
}

export default new ProductsService();