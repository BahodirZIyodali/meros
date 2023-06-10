"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../../config/ormconfig");
const sub_categories_entity_1 = require("../../entities/sub_categories.entity");
const exceptions_1 = require("../../exceptions");
exports.default = {
    GET: async (req, res, next) => {
        try {
            const allCategories = await ormconfig_1.dataSourse
                .getRepository(sub_categories_entity_1.sub_categories)
                .find()
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
    GET_ONE_SUB_CATEGORY: async (req, res, next) => {
        try {
            const { id } = req.params;
            const oneSubCategory = await ormconfig_1.dataSourse
                .getRepository(sub_categories_entity_1.sub_categories)
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
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (oneSubCategory) {
                res.status(200).json({
                    status: 200,
                    message: "found  Sub category",
                    data: oneSubCategory,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
    POST: async (req, res, next) => {
        try {
            const { title, category_id } = req.filtered;
            const categories = category_id;
            const newSubCategory = await ormconfig_1.dataSourse
                .getRepository(sub_categories_entity_1.sub_categories)
                .createQueryBuilder()
                .insert()
                .into(sub_categories_entity_1.sub_categories)
                .values({ title, categories })
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
            const { title, category_id } = req.filtered;
            console.log(category_id, "idan");
            const categories = category_id;
            const updateSubCategory = await ormconfig_1.dataSourse
                .getRepository(sub_categories_entity_1.sub_categories)
                .createQueryBuilder()
                .update(sub_categories_entity_1.sub_categories)
                .set({ title, categories })
                .where({ sub_id: id })
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
                .getRepository(sub_categories_entity_1.sub_categories)
                .createQueryBuilder()
                .delete()
                .from(sub_categories_entity_1.sub_categories)
                .where({ sub_id: id })
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
