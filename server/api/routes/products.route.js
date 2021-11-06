const { Router } = require("express");

const route = Router();
const { productsController } = require("../controllers");
const { authorization, admin } = require("../middleware");

route.get("/", productsController.getProducts);
route.post("/", authorization, admin, productsController.createProduct);
route.patch("/:id", authorization, admin, productsController.updateProduct);
route.delete("/:id", authorization, admin, productsController.deleteProduct);

module.exports = route;