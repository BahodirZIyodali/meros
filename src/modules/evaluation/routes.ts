import { Router } from "express"
import validation from "../../middleware/validation"
import { UpdateRateSchema } from "../../validation/validation"
import rate from "./rate"

const Routes = Router()

export default Routes.put("/rate/:id", validation(UpdateRateSchema), rate.UPDATE_RATE)
