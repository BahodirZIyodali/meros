import { Router } from "express"
import validation from "../../middleware/validation"
import { UpdateDiscountSchema } from "../../validation/validation"
import discount from "./discount"

const Routes = Router()

export default Routes.put("/update/:id", validation(UpdateDiscountSchema), discount.UPDATE)
