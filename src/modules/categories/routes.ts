import { Router } from "express"
import validation from "../../middleware/validation"
import { PostCategorySchema } from "../../validation/validation"
import categories from "./categories"

const authRoutes = Router()

export default authRoutes
  .get("/allCategories", categories.GET)
  .get("/Category/:id", categories.GET_ONE_CATEGORY)
  .post("/create", validation(PostCategorySchema), categories.POST)
  .put("/update/:id", validation(PostCategorySchema), categories.PUT)
  .delete("/delete/:id", categories.DELETE)
