import axios from "./axios";
import type { ProductsInterface, ProductFormDataInterface } from "../interfaces/products-interfaces";
import type { MessageResponseInterface, FileUploadInterface } from "../interfaces";

class ProductsServiceClass {
  getProducts() {
    return axios.get<ProductsInterface[]>("/products");
  }

  createProduct(token: string, formData: ProductFormDataInterface, image: FileUploadInterface) {
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

const ProductsService = new ProductsServiceClass;
export default ProductsService;