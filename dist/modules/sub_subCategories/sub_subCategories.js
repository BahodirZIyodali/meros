"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../../config/ormconfig");
const sub_sub_categories_entity_1 = require("../../entities/sub_sub_categories.entity");
const exceptions_1 = require("../../exceptions");
exports.default = {
    GET: async (req, res, next) => {
        try {
            const allCategories = await ormconfig_1.dataSourse
                .getRepository(sub_sub_categories_entity_1.sub_sub_categories)
                .find({})
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (allCategories) {
                res.status(200).json({
                    status: 200,
                    message: "All categories",
                    data: allCategories,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
    GET_ONE_SUB_SUB_CATEGORY: async (req, res, next) => {
        try {
            const { id } = req.params;
            console.log(id);
            const oneSubSubCategory = await ormconfig_1.dataSourse
                .getRepository(sub_sub_categories_entity_1.sub_sub_categories)
                .findOne({
                relations: {
                    products: true,
                },
                where: {
                    sub_sub_id: id,
                },
            })
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (oneSubSubCategory) {
                res.status(200).json({
                    status: 200,
                    message: "found Sub Sub category",
                    data: oneSubSubCategory,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
    // categoriesCategoryId
    POST: async (req, res, next) => {
        try {
            const { title, sub_category_id } = req.filtered;
            const sub_categories = sub_category_id;
            const newSubCategory = await ormconfig_1.dataSourse
                .getRepository(sub_sub_categories_entity_1.sub_sub_categories)
                .createQueryBuilder()
                .insert()
                .into(sub_sub_categories_entity_1.sub_sub_categories)
                .values({ title, sub_categories })
                .returning("*")
                .execute()
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (newSubCategory) {
                res.status(201).json({
                    status: 201,
                    message: "Created sub category",
                    data: newSubCategory,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
    PUT: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, sub_category_id } = req.filtered;
            const updateSubCategory = await ormconfig_1.dataSourse
                .getRepository(sub_sub_categories_entity_1.sub_sub_categories)
                .createQueryBuilder()
                .update(sub_sub_categories_entity_1.sub_sub_categories)
                .set({ title, sub_categories: sub_category_id })
                .where({ sub_sub_id: id })
                .returning("*")
                .execute()
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (updateSubCategory) {
                res.status(200).json({
                    status: 200,
                    message: "Updated category",
                    data: updateSubCategory,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
    DELETE: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleteSubCategory = await ormconfig_1.dataSourse
                .getRepository(sub_sub_categories_entity_1.sub_sub_categories)
                .createQueryBuilder()
                .delete()
                .from(sub_sub_categories_entity_1.sub_sub_categories)
                .where({ sub_sub_id: id })
                .returning("*")
                .execute()
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (deleteSubCategory) {
                res.status(200).json({
                    status: 200,
                    message: "delete category",
                    data: deleteSubCategory,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
};
