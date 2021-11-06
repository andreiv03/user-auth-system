const { Router } = require("express");

const route = Router();
const { categoriesController } = require("../controllers");
const { authorization, admin } = require("../middleware");

route.get("/", categoriesController.getCategories);
route.post("/", authorization, admin, categoriesController.createCategory);
route.patch("/:id", authorization, admin, categoriesController.updateCategory);
route.delete("/:id", authorization, admin, categoriesController.deleteCategory);

module.exports = route;