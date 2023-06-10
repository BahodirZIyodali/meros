import { NextFunction, Request, Response } from "express"
import { dataSourse } from "../../config/ormconfig"
import { fetchRedis } from "../../config/redis"
import { products } from "../../entities/product.entity"
import { Evaluation } from "../../entities/rate.entity"
import { ErrorHandler } from "../../exceptions"

export default {
  GET_SORT_BY_DISCOUNT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page, limit } = req.query as any
      const pageone = page ? page : 1
      const limitone = limit ? limit : 10
      const client = await fetchRedis()
      const sortProduct: string | null = await client.get("productSortbyDiscount")

      if (!sortProduct) {
        const productSortbyDiscount = await dataSourse
          .getRepository(products)
          .find({
            order: {
              discount: "DESC",
            },
          })
          .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

        await client.setEx("productSortbyDiscount", 15, JSON.stringify(productSortbyDiscount))

        const sortPageArr: products[] | undefined = productSortbyDiscount?.slice(
          (pageone - 1) * limitone,
          limitone * pageone,
        )

        if (productSortbyDiscount) {
          res.status(200).json({
            status: 200,
            message: "Products sort by discount",
            products: sortPageArr,
          })
        }
      } else {
        const sortedProduct = JSON.parse(sortProduct)
        const sortPageArr: products[] | undefined = sortedProduct?.slice((pageone - 1) * limitone, limitone * pageone)

        res.status(200).json({
          status: 200,
          message: "All categories",
          data: sortPageArr,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },
  GET_SORT_BY_START: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page, limit } = req.query as any
      const pageone = page ? page : 1
      const limitone = limit ? limit : 10
      const client = await fetchRedis()
      const sortProduct: string | null = await client.get("productSortbyRate")

      if (!sortProduct) {
        const productSortbyRate = await dataSourse
          .getRepository(Evaluation)
          .find({
            relations: {
              Products: {
                sub_sub_categories: {
                  sub_categories: true,
                },
              },
            },
            select: {
              id: true,
              average: true,
              Products: {
                title: true,
                price: true,
                discont_price: true,
                sub_sub_categories: {
                  title: true,
                  sub_categories: {
                    title: true,
                  },
                },
              },
            },
            order: {
              average: "DESC",
            },
          })
          .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

        await client.setEx("productSortbyRate", 15, JSON.stringify(productSortbyRate))

        const sortPageArr: Evaluation[] | undefined = productSortbyRate?.slice(
          (pageone - 1) * limitone,
          limitone * pageone,
        )

        if (productSortbyRate) {
          res.status(200).json({
            status: 200,
            message: "Products sort by star",
            products: sortPageArr,
          })
        }
      } else {
        const sortedProduct = JSON.parse(sortProduct)
        const sortPageArr: products[] | undefined = sortedProduct?.slice((pageone - 1) * limitone, limitone * pageone)

        res.status(200).json({
          status: 200,
          message: "Products sort by star",
          data: sortPageArr,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },
  GET_SORT_BY_SOLD: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page, limit } = req.query as any
      const pageone = page ? page : 1
      const limitone = limit ? limit : 10
      const client = await fetchRedis()
      const sortProduct: string | null = await client.get("productSortbySold")

      if (!sortProduct) {
        const productSortbySold = await dataSourse
          .getRepository(products)
          .find({
            order: {
              sold_count: "DESC",
            },
          })
          .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

        await client.setEx("productSortbySold", 15, JSON.stringify(productSortbySold))

        const sortPageArr: products[] | undefined = productSortbySold?.slice(
          (pageone - 1) * limitone,
          limitone * pageone,
        )

        if (productSortbySold) {
          res.status(200).json({
            status: 200,
            message: "Products sort by sold",
            products: sortPageArr,
          })
        }
      } else {
        const sortedProduct = JSON.parse(sortProduct)
        const sortPageArr: products[] | undefined = sortedProduct?.slice((pageone - 1) * limitone, limitone * pageone)

        res.status(200).json({
          status: 200,
          message: "Products sort by sold",
          data: sortPageArr,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },
  GET_SORT_BY_DATE_NOW: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page, limit } = req.query as any
      const pageone = page ? page : 1
      const limitone = limit ? limit : 10
      const client = await fetchRedis()
      const sortProduct: string | null = await client.get("productSortbyDateNew")

      if (!sortProduct) {
        const productSortbyDateNew = await dataSourse
          .getRepository(products)
          .find({
            order: {
              time: "DESC",
            },
          })
          .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

        await client.setEx("productSortbyDateNew", 15, JSON.stringify(productSortbyDateNew))

        const sortPageArr: products[] | undefined = productSortbyDateNew?.slice(
          (pageone - 1) * limitone,
          limitone * pageone,
        )

        if (productSortbyDateNew) {
          res.status(200).json({
            status: 200,
            message: "Products sort by Date New",
            products: sortPageArr,
          })
        }
      } else {
        const sortedProduct = JSON.parse(sortProduct)
        const sortPageArr: products[] | undefined = sortedProduct?.slice((pageone - 1) * limitone, limitone * pageone)

        res.status(200).json({
          status: 200,
          message: "Products sort by Date New",
          data: sortPageArr,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },
  GET_SORT_BY_DATE_OLD: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page, limit } = req.query as any
      const pageone = page ? page : 1
      const limitone = limit ? limit : 10
      const client = await fetchRedis()
      const sortProduct: string | null = await client.get("productSortbyDateOld")

      if (!sortProduct) {
        const productSortbyDateOld = await dataSourse
          .getRepository(products)
          .find({
            order: {
              time: "ASC",
            },
          })
          .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

        await client.setEx("productSortbyDateOld", 15, JSON.stringify(productSortbyDateOld))

        const sortPageArr: products[] | undefined = productSortbyDateOld?.slice(
          (pageone - 1) * limitone,
          limitone * pageone,
        )

        if (productSortbyDateOld) {
          res.status(200).json({
            status: 200,
            message: "Products sort by Date Old",
            products: sortPageArr,
          })
        }
      } else {
        const sortedProduct = JSON.parse(sortProduct)
        const sortPageArr: products[] | undefined = sortedProduct?.slice((pageone - 1) * limitone, limitone * pageone)

        res.status(200).json({
          status: 200,
          message: "Products sort by Date Old",
          data: sortPageArr,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },
}
