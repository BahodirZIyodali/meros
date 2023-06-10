import { NextFunction, Request, Response } from "express"
import { dataSourse } from "../../config/ormconfig"
import { products } from "../../entities/product.entity"
import { ErrorHandler } from "../../exceptions"

export default {
  UPDATE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params

      const { discount } = req.filtered as any

      const foundProduct = await dataSourse
        .getRepository(products)
        .findOne({
          where: {
            productId: id,
          },
        })
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 503)))

      if (foundProduct) {
        const price: number = +foundProduct.price.split(" ").join("")

        const arr: string[] = []
        const calc = (price - (price * discount) / 100)
          .toString()
          .split("")
          .reverse()
          .map((e, i, z, q = 1) => (i % 3 >= 1 ? arr.push(e) : arr.push(" ", e)))
        const NewPrice = arr.reverse().join("")

        const updateProduct = await dataSourse
          .getRepository(products)
          .createQueryBuilder()
          .update()
          .set({ discount, discont_price: NewPrice })
          .where({ productId: id })
          .execute()
          .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 503)))

        if (updateProduct) {
          res.status(200).json({
            message: "Updated succesfully",
            status: 200,
          })
        }
      } else {
        res.status(404).json({
          message: "Not found",
          status: 404,
        })
      }
    } catch (error: any) {
      throw new ErrorHandler(error.message, 500)
    }
  },
}
