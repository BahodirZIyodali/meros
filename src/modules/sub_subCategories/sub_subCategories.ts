import { NextFunction, Request, Response } from "express"
import { dataSourse } from "../../config/ormconfig"
import { sub_sub_categories } from "../../entities/sub_sub_categories.entity"
import { ErrorHandler } from "../../exceptions"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allCategories = await dataSourse
        .getRepository(sub_sub_categories)
        .find({})
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
  GET_ONE_SUB_SUB_CATEGORY: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      console.log(id)

      const oneSubSubCategory = await dataSourse
        .getRepository(sub_sub_categories)
        .findOne({
          relations: {
            products: true,
          },
          where: {
            sub_sub_id: id,
          },
        })
        .catch((error: ErrorHandler) => next(new ErrorHandler(error.message, 500)))

      if (oneSubSubCategory) {
        res.status(200).json({
          status: 200,
          message: "found Sub Sub category",
          data: oneSubSubCategory,
        })
      }
    } catch (error: any) {
      throw next(new ErrorHandler(error.message, 500))
    }
  },
  // categoriesCategoryId
  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, sub_category_id } = req.filtered
      const sub_categories = sub_category_id as any

      const newSubCategory = await dataSourse
        .getRepository(sub_sub_categories)
        .createQueryBuilder()
        .insert()
        .into(sub_sub_categories)
        .values({ title, sub_categories })
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
      const { title, sub_category_id } = req.filtered

      const updateSubCategory = await dataSourse
        .getRepository(sub_sub_categories)
        .createQueryBuilder()
        .update(sub_sub_categories)
        .set({ title, sub_categories: sub_category_id as any })
        .where({ sub_sub_id: id })
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
        .getRepository(sub_sub_categories)
        .createQueryBuilder()
        .delete()
        .from(sub_sub_categories)
        .where({ sub_sub_id: id })
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
