"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../../config/ormconfig");
const categories_entity_1 = require("../../entities/categories.entity");
const exceptions_1 = require("../../exceptions");
exports.default = {
    GET: async (req, res, next) => {
        try {
            const allCategories = await ormconfig_1.dataSourse
                .getRepository(categories_entity_1.categories)
                .find()
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 503)));
            if (allCategories) {
                res.status(200).json({
                    status: 200,
                    message: "All categories",
                    data: allCategories,
                });
            }
        }
        catch (error) {
            throw new exceptions_1.ErrorHandler(error.message, 500);
        }
    },
    GET_ONE_CATEGORY: async (req, res, next) => {
        try {
            const { id } = req.params;
            const oneCategory = await ormconfig_1.dataSourse
                .getRepository(categories_entity_1.categories)
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
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (oneCategory) {
                res.status(200).json({
                    status: 200,
                    message: "found  Sub category",
                    data: oneCategory,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
    POST: async (req, res, next) => {
        try {
            const { title } = req.filtered;
            const newCategory = await ormconfig_1.dataSourse
                .getRepository(categories_entity_1.categories)
                .createQueryBuilder()
                .insert()
                .into(categories_entity_1.categories)
                .values({ title })
                .returning("*")
                .execute()
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (newCategory) {
                res.status(201).json({
                    status: 201,
                    message: "Created category",
                    data: newCategory,
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
            const { title } = req.filtered;
            const updateCategory = await ormconfig_1.dataSourse
                .getRepository(categories_entity_1.categories)
                .createQueryBuilder()
                .update(categories_entity_1.categories)
                .set({ title })
                .where({ category_id: id })
                .returning("*")
                .execute()
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (updateCategory) {
                res.status(200).json({
                    status: 200,
                    message: "Updated category",
                    data: updateCategory,
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
            const deleteCategory = await ormconfig_1.dataSourse
                .getRepository(categories_entity_1.categories)
                .createQueryBuilder()
                .delete()
                .from(categories_entity_1.categories)
                .where({ category_id: id })
                .returning("*")
                .execute()
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (deleteCategory) {
                res.status(200).json({
                    status: 200,
                    message: "delete category",
                    data: deleteCategory,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
};
