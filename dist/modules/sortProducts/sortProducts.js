"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../../config/ormconfig");
const redis_1 = require("../../config/redis");
const product_entity_1 = require("../../entities/product.entity");
const rate_entity_1 = require("../../entities/rate.entity");
const exceptions_1 = require("../../exceptions");
exports.default = {
    GET_SORT_BY_DISCOUNT: async (req, res, next) => {
        try {
            const { page, limit } = req.query;
            const pageone = page ? page : 1;
            const limitone = limit ? limit : 10;
            const client = await (0, redis_1.fetchRedis)();
            const sortProduct = await client.get("productSortbyDiscount");
            if (!sortProduct) {
                const productSortbyDiscount = await ormconfig_1.dataSourse
                    .getRepository(product_entity_1.products)
                    .find({
                    order: {
                        discount: "DESC",
                    },
                })
                    .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
                await client.setEx("productSortbyDiscount", 15, JSON.stringify(productSortbyDiscount));
                const sortPageArr = productSortbyDiscount?.slice((pageone - 1) * limitone, limitone * pageone);
                if (productSortbyDiscount) {
                    res.status(200).json({
                        status: 200,
                        message: "Products sort by discount",
                        products: sortPageArr,
                    });
                }
            }
            else {
                const sortedProduct = JSON.parse(sortProduct);
                const sortPageArr = sortedProduct?.slice((pageone - 1) * limitone, limitone * pageone);
                res.status(200).json({
                    status: 200,
                    message: "All categories",
                    data: sortPageArr,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
    GET_SORT_BY_START: async (req, res, next) => {
        try {
            const { page, limit } = req.query;
            const pageone = page ? page : 1;
            const limitone = limit ? limit : 10;
            const client = await (0, redis_1.fetchRedis)();
            const sortProduct = await client.get("productSortbyRate");
            if (!sortProduct) {
                const productSortbyRate = await ormconfig_1.dataSourse
                    .getRepository(rate_entity_1.Evaluation)
                    .find({
                    relations: {
                        Products: {
                            sub_sub_categories: {
                                sub_categories: true,
                            },
                        },
                    },
                    select: {
                        id: true,
                        average: true,
                        Products: {
                            title: true,
                            price: true,
                            discont_price: true,
                            sub_sub_categories: {
                                title: true,
                                sub_categories: {
                                    title: true,
                                },
                            },
                        },
                    },
                    order: {
                        average: "DESC",
                    },
                })
                    .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
                await client.setEx("productSortbyRate", 15, JSON.stringify(productSortbyRate));
                const sortPageArr = productSortbyRate?.slice((pageone - 1) * limitone, limitone * pageone);
                if (productSortbyRate) {
                    res.status(200).json({
                        status: 200,
                        message: "Products sort by star",
                        products: sortPageArr,
                    });
                }
            }
            else {
                const sortedProduct = JSON.parse(sortProduct);
                const sortPageArr = sortedProduct?.slice((pageone - 1) * limitone, limitone * pageone);
                res.status(200).json({
                    status: 200,
                    message: "Products sort by star",
                    data: sortPageArr,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
    GET_SORT_BY_SOLD: async (req, res, next) => {
        try {
            const { page, limit } = req.query;
            const pageone = page ? page : 1;
            const limitone = limit ? limit : 10;
            const client = await (0, redis_1.fetchRedis)();
            const sortProduct = await client.get("productSortbySold");
            if (!sortProduct) {
                const productSortbySold = await ormconfig_1.dataSourse
                    .getRepository(product_entity_1.products)
                    .find({
                    order: {
                        sold_count: "DESC",
                    },
                })
                    .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
                await client.setEx("productSortbySold", 15, JSON.stringify(productSortbySold));
                const sortPageArr = productSortbySold?.slice((pageone - 1) * limitone, limitone * pageone);
                if (productSortbySold) {
                    res.status(200).json({
                        status: 200,
                        message: "Products sort by sold",
                        products: sortPageArr,
                    });
                }
            }
            else {
                const sortedProduct = JSON.parse(sortProduct);
                const sortPageArr = sortedProduct?.slice((pageone - 1) * limitone, limitone * pageone);
                res.status(200).json({
                    status: 200,
                    message: "Products sort by sold",
                    data: sortPageArr,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
    GET_SORT_BY_DATE_NOW: async (req, res, next) => {
        try {
            const { page, limit } = req.query;
            const pageone = page ? page : 1;
            const limitone = limit ? limit : 10;
            const client = await (0, redis_1.fetchRedis)();
            const sortProduct = await client.get("productSortbyDateNew");
            if (!sortProduct) {
                const productSortbyDateNew = await ormconfig_1.dataSourse
                    .getRepository(product_entity_1.products)
                    .find({
                    order: {
                        time: "DESC",
                    },
                })
                    .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
                await client.setEx("productSortbyDateNew", 15, JSON.stringify(productSortbyDateNew));
                const sortPageArr = productSortbyDateNew?.slice((pageone - 1) * limitone, limitone * pageone);
                if (productSortbyDateNew) {
                    res.status(200).json({
                        status: 200,
                        message: "Products sort by Date New",
                        products: sortPageArr,
                    });
                }
            }
            else {
                const sortedProduct = JSON.parse(sortProduct);
                const sortPageArr = sortedProduct?.slice((pageone - 1) * limitone, limitone * pageone);
                res.status(200).json({
                    status: 200,
                    message: "Products sort by Date New",
                    data: sortPageArr,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
    GET_SORT_BY_DATE_OLD: async (req, res, next) => {
        try {
            const { page, limit } = req.query;
            const pageone = page ? page : 1;
            const limitone = limit ? limit : 10;
            const client = await (0, redis_1.fetchRedis)();
            const sortProduct = await client.get("productSortbyDateOld");
            if (!sortProduct) {
                const productSortbyDateOld = await ormconfig_1.dataSourse
                    .getRepository(product_entity_1.products)
                    .find({
                    order: {
                        time: "ASC",
                    },
                })
                    .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
                await client.setEx("productSortbyDateOld", 15, JSON.stringify(productSortbyDateOld));
                const sortPageArr = productSortbyDateOld?.slice((pageone - 1) * limitone, limitone * pageone);
                if (productSortbyDateOld) {
                    res.status(200).json({
                        status: 200,
                        message: "Products sort by Date Old",
                        products: sortPageArr,
                    });
                }
            }
            else {
                const sortedProduct = JSON.parse(sortProduct);
                const sortPageArr = sortedProduct?.slice((pageone - 1) * limitone, limitone * pageone);
                res.status(200).json({
                    status: 200,
                    message: "Products sort by Date Old",
                    data: sortPageArr,
                });
            }
        }
        catch (error) {
            throw next(new exceptions_1.ErrorHandler(error.message, 500));
        }
    },
};
