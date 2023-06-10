"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../../config/ormconfig");
const redis_1 = require("../../config/redis");
const product_entity_1 = require("../../entities/product.entity");
const exceptions_1 = require("../../exceptions");
exports.default = {
    GET: async (req, res, next) => {
        try {
            const { page, limit } = req.query;
            const pageone = page ? page : 1;
            const limitone = limit ? limit : 10;
            const client = await (0, redis_1.fetchRedis)();
            const product = await client.get("AllProducts");
            if (!product) {
                const allProducts = await ormconfig_1.dataSourse
                    .getRepository(product_entity_1.products)
                    .find({
                    relations: {
                        Evaluation: true,
                    },
                    select: {
                        Comments: {
                            comment_id: true,
                            commentary: true,
                            users: {
                                user_id: true,
                                user_name: true,
                                user_img: true,
                            },
                        },
                        Evaluation: {
                            id: true,
                            average: true,
                        },
                    },
                })
                    .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
                await client.setEx("AllProducts", 15, JSON.stringify(allProducts));
                const pageArr = allProducts?.slice((pageone - 1) * limitone, limitone * pageone);
                if (pageArr) {
                    res.status(200).json({
                        status: 200,
                        message: "All categories",
                        data: pageArr,
                    });
                }
            }
            else {
                const allProducts = JSON.parse(product);
                const pageArr = allProducts?.slice((pageone - 1) * limitone, limitone * pageone);
                res.status(200).json({
                    status: 200,
                    message: "All categories",
                    data: pageArr,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
    GET_ONE_PRODUCT: async (req, res, next) => {
        try {
            const { id } = req.params;
            const client = await (0, redis_1.fetchRedis)();
            const product = await client.get("AllProducts");
            const Allproducts = JSON.parse(product);
            if (!Allproducts) {
                const oneProduct = await ormconfig_1.dataSourse
                    .getRepository(product_entity_1.products)
                    .findOne({
                    relations: {
                        Comments: {
                            users: true,
                        },
                        Evaluation: true,
                    },
                    select: {
                        Comments: {
                            comment_id: true,
                            commentary: true,
                            users: {
                                user_id: true,
                                user_name: true,
                                user_img: true,
                            },
                        },
                        Evaluation: {
                            id: true,
                            average: true,
                        },
                    },
                    where: {
                        productId: id,
                    },
                })
                    .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
                if (oneProduct) {
                    res.status(200).json({
                        status: 200,
                        message: "found Product",
                        data: oneProduct,
                    });
                }
            }
            else {
                const findProduct = Allproducts.find((e) => e.productId == id);
                res.status(200).json({
                    status: 200,
                    message: "found one Product",
                    data: findProduct,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
    POST: async (req, res, next) => {
        try {
            const { sub_sub_id, title, price, discont_price, brand, size, 
            // netto ,
            author, description, color, made_in, discount, img, img1, img2, img3, img4, } = req.filtered;
            const sub_sub_categories = sub_sub_id;
            const newSubCategory = await ormconfig_1.dataSourse
                .getRepository(product_entity_1.products)
                .createQueryBuilder()
                .insert()
                .into(product_entity_1.products)
                .values({
                title,
                price,
                discont_price,
                brand,
                size,
                // netto ,
                author,
                description,
                color,
                made_in,
                discount,
                img,
                img1,
                img2,
                img3,
                img4,
                sub_sub_categories,
            })
                .returning("*")
                .execute()
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (newSubCategory) {
                res.status(201).json({
                    status: 201,
                    message: "Created Product",
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
            const { sub_sub_id, title, price, discont_price, brand, size, 
            // netto ,
            author, description, color, made_in, discount, img, img1, img2, img3, img4, } = req.filtered;
            const updateSubCategory = await ormconfig_1.dataSourse
                .getRepository(product_entity_1.products)
                .createQueryBuilder()
                .update(product_entity_1.products)
                .set({
                title,
                price,
                discont_price,
                brand,
                size,
                // netto ,
                author,
                description,
                color,
                made_in,
                discount,
                img,
                img1,
                img2,
                img3,
                img4,
                sub_sub_categories: sub_sub_id,
            })
                .where({ productId: id })
                .returning("*")
                .execute()
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (updateSubCategory) {
                res.status(200).json({
                    status: 200,
                    message: "Updated product",
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
                .getRepository(product_entity_1.products)
                .createQueryBuilder()
                .delete()
                .from(product_entity_1.products)
                .where({ productId: id })
                .returning("*")
                .execute()
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (deleteSubCategory) {
                res.status(200).json({
                    status: 200,
                    message: "delete product",
                    data: deleteSubCategory,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
};
