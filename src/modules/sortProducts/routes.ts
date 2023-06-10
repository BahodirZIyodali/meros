import { Router } from "express"
import sortProducts from "./sortProducts"

const Routes = Router()

export default Routes.get("/discount", sortProducts.GET_SORT_BY_DISCOUNT)
  .get("/star", sortProducts.GET_SORT_BY_START)
  .get("/soldProduct", sortProducts.GET_SORT_BY_SOLD)
  .get("/NewDateProduct", sortProducts.GET_SORT_BY_DATE_NOW)
  .get("/OldDateProduct", sortProducts.GET_SORT_BY_DATE_OLD)
