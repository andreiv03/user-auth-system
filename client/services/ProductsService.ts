import axios from "./AxiosSettings";
import { ProductsInterface, ProductFormDataInterface } from "../interfaces/ProductsInterfaces";
import { GoogleDriveUploadInterface } from "../interfaces/APIs";
import { MessageResponseInterface } from "../interfaces/AxiosInterfaces";

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
    return axios.patch<MessageResponseInterface>(`/products/${id}`, { ...formData }, {
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