import { Router } from "express"
import validation from "../../middleware/validation"
import verify from "../../middleware/verify"
import { LoginPostSchema, RegistorPostSchema, UpdatePostSchema } from "../../validation/validation"
import auth from "./auth"

const authRoutes = Router()

export default authRoutes
  .post("/login", validation(LoginPostSchema), auth.LOGIN)
  .post("/registor", validation(RegistorPostSchema), auth.POST_REGISTOR)
  .put("/updateUser", validation(UpdatePostSchema), verify, auth.UPDATE)
