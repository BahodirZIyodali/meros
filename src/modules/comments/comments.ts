import { NextFunction, Request, Response } from "express"
import { dataSourse } from "../../config/ormconfig"
import { Comments } from "../../entities/comments.entity"
import { ErrorHandler } from "../../exceptions"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    } catch (error: any) {
      throw new ErrorHandler(error.message, 500)
    }
  },
  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ProductId, userId, commentary } = req.filtered as any

      const addComment = await dataSourse
        .getRepository(Comments)
        .createQueryBuilder()
        .insert()
        .into(Comments)
        .values({ products: ProductId, users: userId, commentary })
        .returning("*")
        .execute()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 503)))

      if (addComment) {
        res.status(201).json({
          status: 201,
          message: "Add comment",
          data: addComment,
        })
      }
    } catch (error: any) {
      throw new ErrorHandler(error.message, 500)
    }
  },
  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const { ProductId, userId, commentary } = req.filtered as any
      const UpdateComment = await dataSourse
        .getRepository(Comments)
        .createQueryBuilder()
        .update()
        .set({ products: ProductId, users: userId, commentary })
        .where({ comment_id: id })
        .returning("*")
        .execute()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 503)))

      if (UpdateComment) {
        res.status(200).json({
          status: 200,
          message: "Update comment",
          data: UpdateComment,
        })
      }
    } catch (error: any) {
      throw new ErrorHandler(error.message, 500)
    }
  },
  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params

      const deleteComment = await dataSourse
        .getRepository(Comments)
        .createQueryBuilder()
        .delete()
        .from(Comments)
        .where({ comment_id: id })
        .returning("*")
        .execute()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (deleteComment) {
        res.status(200).json({
          status: 200,
          message: "Delete comment",
          data: deleteComment,
        })
      }
    } catch (error: any) {
      throw new ErrorHandler(error.message, 500)
    }
  },
}
