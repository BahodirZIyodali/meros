import { Router } from "express"
import validation from "../../middleware/validation"
import { PostSubSubCategorySchema, UpdateSubSubCategorySchema } from "../../validation/validation"
import subSubCategories from "./sub_subCategories"

const authRoutes = Router()

export default authRoutes
  .get("/allSubSubCategories", subSubCategories.GET)
  .get("/SubSubCategory/:id", subSubCategories.GET_ONE_SUB_SUB_CATEGORY)
  .post("/create", validation(PostSubSubCategorySchema), subSubCategories.POST)
  .put("/update/:id", validation(UpdateSubSubCategorySchema), subSubCategories.PUT)
  .delete("/delete/:id", subSubCategories.DELETE)
