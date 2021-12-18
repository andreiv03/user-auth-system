const { Router } = require("express");
const { productsController } = require("../controllers");
const { authorization, admin } = require("../middleware");

const route = Router();
route.get("/", productsController.getProducts);
route.post("/", authorization, admin, productsController.createProduct);
route.patch("/:id", authorization, admin, productsController.updateProduct);
route.delete("/:id", authorization, admin, productsController.deleteProduct);

module.exports = route;