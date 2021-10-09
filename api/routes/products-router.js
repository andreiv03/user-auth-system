const router = require("express").Router();
const productsController = require("../controllers/products-controller.js");

module.exports = () => {
  router.get("/products", productsController.getProducts);
  router.post("/products", productsController.createProduct);

  router.post("/products/:id", productsController.updateProduct);
  router.post("/products/:id", productsController.deleteProduct);

  return router;
}