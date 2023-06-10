import { NextFunction, Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"
import { dataSourse } from "../../config/ormconfig"
import { Orders } from "../../entities/order.entity"
import { products } from "../../entities/product.entity"
import { ErrorHandler } from "../../exceptions"
import { verify } from "../../utils/jwt"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { access_token } = req.headers as any
      const id = verify(access_token) as any
      console.log(id)

      const foundOrder = await dataSourse
        .getRepository(Orders)
        .find({
          relations: {
            costumer: true,
            Products: true,
          },
          select: {
            costumer: {
              user_name: true,
              user_surname: true,
              user_img: true,
            },
            Products: {
              price: true,
              title: true,
              brand: true,
              discount: true,
              discont_price: true,
              made_in: true,
            },
          },

          where: {
            costumer: {
              user_id: id,
            },
          },
        })
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 503)))

      if (foundOrder) {
        res.status(200).json({
          status: 200,
          message: "All Buy  Products",
          data: foundOrder,
        })
      }
    } catch (error: any) {
      throw new ErrorHandler(error.message, 500)
    }
  },
  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id, ProductId, count } = req.filtered as any

      const foundProduct = await dataSourse
        .getRepository(products)
        .findOne({
          where: {
            productId: ProductId,
          },
        })
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 503)))

      const foundOrder = await dataSourse
        .getRepository(Orders)
        .findOne({
          where: {
            Products: { productId: ProductId },
            costumer: { user_id: id },
          },
        })
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 503)))

      if (!foundOrder) {
        const newCountProduct = foundProduct?.sold_count + count
        const createOrder = await dataSourse
          .getRepository(Orders)
          .createQueryBuilder()
          .insert()
          .into(Orders)
          .values({ count: count, Products: ProductId, costumer: id })
          .returning("*")
          .execute()
          .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 503)))

        const updatedProduct = await dataSourse
          .getRepository(products)
          .createQueryBuilder()
          .update(products)
          .set({ sold_count: newCountProduct })
          .where({ productId: ProductId })
          .execute()
          .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 503)))

        if (createOrder && updatedProduct) {
          res.status(201).json({
            status: 201,
            message: "You by product",
            data: createOrder,
          })
        }
      } else if (foundOrder) {
        const updateOrderCount = foundOrder.count + count
        const allSoldProductCount = foundProduct?.sold_count + count

        const updatedProduct = await dataSourse
          .getRepository(products)
          .createQueryBuilder()
          .update(products)
          .set({ sold_count: allSoldProductCount })
          .where({ productId: ProductId })
          .execute()
          .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 503)))

        const updateOrder = await dataSourse
          .getRepository(Orders)
          .createQueryBuilder()
          .update(Orders)
          .set({ count: updateOrderCount })
          .returning("*")
          .execute()
          .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 503)))

        if (updateOrder && updatedProduct) {
          res.status(200).json({
            status: 200,
            message: "by product and get my products",
            data: updateOrder,
          })
        }
      }
    } catch (error: any) {
      throw new ErrorHandler(error.message, 500)
    }
  },
}
