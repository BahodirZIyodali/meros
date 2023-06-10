import { Router } from "express"
import validation from "../../middleware/validation"
import { PostSubCategorySchema, UpdateSubCategorySchema } from "../../validation/validation"
import subcategories from "./subCategories"

const authRoutes = Router()

export default authRoutes
  .get("/allSubCategories", subcategories.GET)
  .get("/SubCategory/:id", subcategories.GET_ONE_SUB_CATEGORY)
  .post("/create", validation(PostSubCategorySchema), subcategories.POST)
  .put("/update/:id", validation(UpdateSubCategorySchema), subcategories.PUT)
  .delete("/delete/:id", subcategories.DELETE)
