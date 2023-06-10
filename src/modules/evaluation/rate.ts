import { NextFunction, Request, Response } from "express"
import { dataSourse } from "../../config/ormconfig"
import { Evaluation } from "../../entities/rate.entity"
import { ErrorHandler } from "../../exceptions"

export default {
  UPDATE_RATE: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as any

      const { star } = req.filtered as any

      const rate = await dataSourse
        .getRepository(Evaluation)
        .findOne({
          where: {
            Products: { productId: id },
          },
        })
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (!rate) {
        const newRate = await dataSourse
          .getRepository(Evaluation)
          .createQueryBuilder()
          .insert()
          .into(Evaluation)
          .values({ increment: 1, star: star, average: star, Products: id })
          .returning("*")
          .execute()
          .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

        if (newRate) {
          return res.status(201).json({
            message: "Successful",
            status: 201,
          })
        }
      } else if (rate) {
        const idstar = rate?.id
        const increment: number = rate?.increment + 1
        const stars: number = rate?.star + star
        const average = +(stars / increment).toFixed(2)

        const updateRate = (await dataSourse
          .getRepository(Evaluation)
          .createQueryBuilder()
          .update(Evaluation)
          .set({ increment, star: stars, average })
          .where({ id: idstar })
          .returning("*")
          .execute()) as any

        if (updateRate) {
          res.status(200).json({
            message: "Successful",
            status: 200,
          })
        }
      }
    } catch (err: any) {
      throw next(new ErrorHandler(err.message, 500))
    }
  },
}
