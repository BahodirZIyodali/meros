import { NextFunction, Request, Response } from "express"
import { dataSourse } from "../../config/ormconfig"
import { categories } from "../../entities/categories.entity"
import { ErrorHandler } from "../../exceptions"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allCategories = await dataSourse
        .getRepository(categories)
        .find()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 503)))

      if (allCategories) {
        res.status(200).json({
          status: 200,
          message: "All categories",
          data: allCategories,
        })
      }
    } catch (error: any) {
      throw new ErrorHandler(error.message, 500)
    }
  },
  GET_ONE_CATEGORY: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params

      const oneCategory = await dataSourse
        .getRepository(categories)
        .findOne({
          relations: {
            sub_categories: {
              sub_sub_categories: {
                products: true,
              },
            },
          },
          where: {
            category_id: id,
          },
        })
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (oneCategory) {
        res.status(200).json({
          status: 200,
          message: "found  Sub category",
          data: oneCategory,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title } = req.filtered

      const newCategory = await dataSourse
        .getRepository(categories)
        .createQueryBuilder()
        .insert()
        .into(categories)
        .values({ title })
        .returning("*")
        .execute()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (newCategory) {
        res.status(201).json({
          status: 201,
          message: "Created category",
          data: newCategory,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const { title } = req.filtered

      const updateCategory = await dataSourse
        .getRepository(categories)
        .createQueryBuilder()
        .update(categories)
        .set({ title })
        .where({ category_id: id })
        .returning("*")
        .execute()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (updateCategory) {
        res.status(200).json({
          status: 200,
          message: "Updated category",
          data: updateCategory,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params

      const deleteCategory = await dataSourse
        .getRepository(categories)
        .createQueryBuilder()
        .delete()
        .from(categories)
        .where({ category_id: id })
        .returning("*")
        .execute()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (deleteCategory) {
        res.status(200).json({
          status: 200,
          message: "delete category",
          data: deleteCategory,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },
}
