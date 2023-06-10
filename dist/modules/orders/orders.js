"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../../config/ormconfig");
const order_entity_1 = require("../../entities/order.entity");
const product_entity_1 = require("../../entities/product.entity");
const exceptions_1 = require("../../exceptions");
const jwt_1 = require("../../utils/jwt");
exports.default = {
    GET: async (req, res, next) => {
        try {
            const { access_token } = req.headers;
            const id = (0, jwt_1.verify)(access_token);
            console.log(id);
            const foundOrder = await ormconfig_1.dataSourse
                .getRepository(order_entity_1.Orders)
                .find({
                relations: {
                    costumer: true,
                    Products: true,
                },
                select: {
                    costumer: {
                        user_name: true,
                        user_surname: true,
                        user_img: true,
                    },
                    Products: {
                        price: true,
                        title: true,
                        brand: true,
                        discount: true,
                        discont_price: true,
                        made_in: true,
                    },
                },
                where: {
                    costumer: {
                        user_id: id,
                    },
                },
            })
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 503)));
            if (foundOrder) {
                res.status(200).json({
                    status: 200,
                    message: "All Buy  Products",
                    data: foundOrder,
                });
            }
        }
        catch (error) {
            throw new exceptions_1.ErrorHandler(error.message, 500);
        }
    },
    POST: async (req, res, next) => {
        try {
            const { id, ProductId, count } = req.filtered;
            const foundProduct = await ormconfig_1.dataSourse
                .getRepository(product_entity_1.products)
                .findOne({
                where: {
                    productId: ProductId,
                },
            })
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 503)));
            const foundOrder = await ormconfig_1.dataSourse
                .getRepository(order_entity_1.Orders)
                .findOne({
                where: {
                    Products: { productId: ProductId },
                    costumer: { user_id: id },
                },
            })
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 503)));
            if (!foundOrder) {
                const newCountProduct = foundProduct?.sold_count + count;
                const createOrder = await ormconfig_1.dataSourse
                    .getRepository(order_entity_1.Orders)
                    .createQueryBuilder()
                    .insert()
                    .into(order_entity_1.Orders)
                    .values({ count: count, Products: ProductId, costumer: id })
                    .returning("*")
                    .execute()
                    .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 503)));
                const updatedProduct = await ormconfig_1.dataSourse
                    .getRepository(product_entity_1.products)
                    .createQueryBuilder()
                    .update(product_entity_1.products)
                    .set({ sold_count: newCountProduct })
                    .where({ productId: ProductId })
                    .execute()
                    .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 503)));
                if (createOrder && updatedProduct) {
                    res.status(201).json({
                        status: 201,
                        message: "You by product",
                        data: createOrder,
                    });
                }
            }
            else if (foundOrder) {
                const updateOrderCount = foundOrder.count + count;
                const allSoldProductCount = foundProduct?.sold_count + count;
                const updatedProduct = await ormconfig_1.dataSourse
                    .getRepository(product_entity_1.products)
                    .createQueryBuilder()
                    .update(product_entity_1.products)
                    .set({ sold_count: allSoldProductCount })
                    .where({ productId: ProductId })
                    .execute()
                    .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 503)));
                const updateOrder = await ormconfig_1.dataSourse
                    .getRepository(order_entity_1.Orders)
                    .createQueryBuilder()
                    .update(order_entity_1.Orders)
                    .set({ count: updateOrderCount })
                    .returning("*")
                    .execute()
                    .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 503)));
                if (updateOrder && updatedProduct) {
                    res.status(200).json({
                        status: 200,
                        message: "by product and get my products",
                        data: updateOrder,
                    });
                }
            }
        }
        catch (error) {
            throw new exceptions_1.ErrorHandler(error.message, 500);
        }
    },
};
