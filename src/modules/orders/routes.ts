import { Router } from "express"
import validation from "../../middleware/validation"
import verify from "../../middleware/verify"
import { PostOrderSchema } from "../../validation/validation"
import orders from "./orders"

const Routes = Router()

export default Routes.get("/myproducts", orders.GET).post("/create", validation(PostOrderSchema), verify, orders.POST)
