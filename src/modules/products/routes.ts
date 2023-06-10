import { Router } from "express"
import validation from "../../middleware/validation"
import { PostProductSchema, UpdateProductSchema } from "../../validation/validation"
import products from "./products"

const authRoutes = Router()

export default authRoutes
  .get("/allProducts", products.GET)
  .get("/oneProduct/:id", products.GET_ONE_PRODUCT)
  .post("/create", validation(PostProductSchema), products.POST)
  .put("/update/:id", validation(UpdateProductSchema), products.PUT)
  .delete("/delete/:id", products.DELETE)
