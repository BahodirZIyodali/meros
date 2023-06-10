import { Router } from "express"
import validation from "../../middleware/validation"
import { PostCommentSchema, UpdateCommentSchema } from "../../validation/validation"
import comments from "./comments"

const authRoutes = Router()

export default authRoutes
  .post("/create", validation(PostCommentSchema), comments.POST)
  .put("/update/:id", validation(UpdateCommentSchema), comments.PUT)
  .delete("/delete/:id", comments.DELETE)
