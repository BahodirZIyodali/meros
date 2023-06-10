import { NextFunction, Request, Response } from "express"

import { dataSourse } from "../../config/ormconfig"
import { fetchRedis } from "../../config/redis"
import { products } from "../../entities/product.entity"
import { ErrorHandler } from "../../exceptions"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page, limit } = req.query as any
      const pageone = page ? page : 1
      const limitone = limit ? limit : 10
      const client = await fetchRedis()
      const product: string | null = await client.get("AllProducts")

      if (!product) {
        const allProducts: products[] | void = await dataSourse
          .getRepository(products)
          .find({
            relations: {
              Evaluation: true,
            },
            select: {
              Comments: {
                comment_id: true,
                commentary: true,
                users: {
                  user_id: true,
                  user_name: true,
                  user_img: true,
                },
              },
              Evaluation: {
                id: true,
                average: true,
              },
            },
          })
          .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

        await client.setEx("AllProducts", 15, JSON.stringify(allProducts))

        const pageArr: products[] | undefined = allProducts?.slice((pageone - 1) * limitone, limitone * pageone)

        if (pageArr) {
          res.status(200).json({
            status: 200,
            message: "All categories",
            data: pageArr,
          })
        }
      } else {
        const allProducts = JSON.parse(product)
        const pageArr: products[] | undefined = allProducts?.slice((pageone - 1) * limitone, limitone * pageone)

        res.status(200).json({
          status: 200,
          message: "All categories",
          data: pageArr,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },
  GET_ONE_PRODUCT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const client = await fetchRedis()
      const product: any | null = await client.get("AllProducts")
      const Allproducts: [] = JSON.parse(product)

      if (!Allproducts) {
        const oneProduct = await dataSourse
          .getRepository(products)
          .findOne({
            relations: {
              Comments: {
                users: true,
              },
              Evaluation: true,
            },
            select: {
              Comments: {
                comment_id: true,
                commentary: true,
                users: {
                  user_id: true,
                  user_name: true,
                  user_img: true,
                },
              },
              Evaluation: {
                id: true,
                average: true,
              },
            },
            where: {
              productId: id,
            },
          })
          .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

        if (oneProduct) {
          res.status(200).json({
            status: 200,
            message: "found Product",
            data: oneProduct,
          })
        }
      } else {
        const findProduct: object | undefined = Allproducts.find((e: any) => e.productId == id)

        res.status(200).json({
          status: 200,
          message: "found one Product",
          data: findProduct,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const {
        sub_sub_id,
        title,
        price,
        discont_price,
        brand,
        size,
        // netto ,
        author,
        description,
        color,
        made_in,
        discount,
        img,
        img1,
        img2,
        img3,
        img4,
      } = req.filtered as any
      const sub_sub_categories = sub_sub_id as any

      const newSubCategory = await dataSourse
        .getRepository(products)
        .createQueryBuilder()
        .insert()
        .into(products)
        .values({
          title,
          price,
          discont_price,
          brand,
          size,
          // netto ,
          author,
          description,
          color,
          made_in,
          discount,
          img,
          img1,
          img2,
          img3,
          img4,
          sub_sub_categories,
        })
        .returning("*")
        .execute()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (newSubCategory) {
        res.status(201).json({
          status: 201,
          message: "Created Product",
          data: newSubCategory,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const {
        sub_sub_id,
        title,
        price,
        discont_price,
        brand,
        size,
        // netto ,
        author,
        description,
        color,
        made_in,
        discount,
        img,
        img1,
        img2,
        img3,
        img4,
      } = req.filtered

      const updateSubCategory = await dataSourse
        .getRepository(products)
        .createQueryBuilder()
        .update(products)
        .set({
          title,
          price,
          discont_price,
          brand,
          size,
          // netto ,
          author,
          description,
          color,
          made_in,
          discount,
          img,
          img1,
          img2,
          img3,
          img4,
          sub_sub_categories: sub_sub_id as any,
        })
        .where({ productId: id })
        .returning("*")
        .execute()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (updateSubCategory) {
        res.status(200).json({
          status: 200,
          message: "Updated product",
          data: updateSubCategory,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params

      const deleteSubCategory = await dataSourse
        .getRepository(products)
        .createQueryBuilder()
        .delete()
        .from(products)
        .where({ productId: id })
        .returning("*")
        .execute()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (deleteSubCategory) {
        res.status(200).json({
          status: 200,
          message: "delete product",
          data: deleteSubCategory,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },
}
