import express from "express";

import productsController from "../controllers/products-controllers/products-controller.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/auth-admin.js";

export default globalRouter => {
  const router = express.Router();

  router.get("/products", productsController.getProducts);
  router.post("/products", auth, authAdmin, productsController.createProduct);

  router.put("/products/:id", auth, authAdmin, productsController.updateProduct);
  router.delete("/products/:id", auth, authAdmin, productsController.deleteProduct);

  globalRouter.use("/api", router);
}