import axios from "./AxiosSettings";
import { ProductsInterface } from "../interfaces/ProductsInterfaces";

class ProductsService {
  // APIs
  getProducts() {
    return axios.get<ProductsInterface>("/products");
  }
}

export default new ProductsService();