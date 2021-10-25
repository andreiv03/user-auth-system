const { Router } = require("express");

const route = Router();
const { productsController, categoriesController } = require("../controllers");
const { authorization, admin } = require("../middleware");

route.get("/", productsController.getProducts);
route.post("/", authorization, admin, productsController.createProduct);
route.patch("/:id", authorization, admin, productsController.updateProduct);
route.delete("/:id", authorization, admin, productsController.deleteProduct);

route.get("/categories", categoriesController.getCategories);
route.post("/categories", authorization, admin, categoriesController.createCategory);
route.patch("/categories/:id", authorization, admin, categoriesController.updateCategory);
route.delete("/categories/:id", authorization, admin, categoriesController.deleteCategory);

module.exports = route;