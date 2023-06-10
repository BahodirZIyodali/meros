import { NextFunction, Request, Response } from "express"
import { dataSourse } from "../../config/ormconfig"
import { sub_categories } from "../../entities/sub_categories.entity"
import { ErrorHandler } from "../../exceptions"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allCategories = await dataSourse
        .getRepository(sub_categories)
        .find()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (allCategories) {
        res.status(200).json({
          status: 200,
          message: "All categories",
          data: allCategories,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },
  GET_ONE_SUB_CATEGORY: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params

      const oneSubCategory = await dataSourse
        .getRepository(sub_categories)
        .findOne({
          relations: {
            sub_sub_categories: {
              products: true,
            },
          },
          where: {
            sub_id: id,
          },
        })
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (oneSubCategory) {
        res.status(200).json({
          status: 200,
          message: "found  Sub category",
          data: oneSubCategory,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },
  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, category_id } = req.filtered
      const categories = category_id as any

      const newSubCategory = await dataSourse
        .getRepository(sub_categories)
        .createQueryBuilder()
        .insert()
        .into(sub_categories)
        .values({ title, categories })
        .returning("*")
        .execute()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (newSubCategory) {
        res.status(201).json({
          status: 201,
          message: "Created sub category",
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
      const { title, category_id } = req.filtered
      console.log(category_id, "idan")
      const categories: any = category_id

      const updateSubCategory = await dataSourse
        .getRepository(sub_categories)
        .createQueryBuilder()
        .update(sub_categories)
        .set({ title, categories })
        .where({ sub_id: id })
        .returning("*")
        .execute()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (updateSubCategory) {
        res.status(200).json({
          status: 200,
          message: "Updated category",
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
        .getRepository(sub_categories)
        .createQueryBuilder()
        .delete()
        .from(sub_categories)
        .where({ sub_id: id })
        .returning("*")
        .execute()
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (deleteSubCategory) {
        res.status(200).json({
          status: 200,
          message: "delete category",
          data: deleteSubCategory,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },
}
