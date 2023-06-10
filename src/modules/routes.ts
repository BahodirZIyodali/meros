import { Router } from "express"
import auth from "./auth/routes"
import categories from "./categories/routes"
import subCategories from "./subCategories/routes"
import SubSubCategories from "./sub_subCategories/routes"
import products from "./products/routes"
import comments from "./comments/routes"
import evaluation from "./evaluation/routes"
import discount from "./discount/routes"
import Orders from "./orders/routes"
import Sort from "./sortProducts/routes"

const router = Router()

export default router
  .use("/auth", auth)
  .use("/categories", categories)
  .use("/subCategories", subCategories)
  .use("/SubSubCategories", SubSubCategories)
  .use("/product", products)
  .use("/comment", comments)
  .use("/evaluation", evaluation)
  .use("/ ", discount)
  .use("/orders", Orders)
  .use("/sortproduct", Sort)
