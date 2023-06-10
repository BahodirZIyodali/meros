"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../../config/ormconfig");
const product_entity_1 = require("../../entities/product.entity");
const exceptions_1 = require("../../exceptions");
exports.default = {
    UPDATE: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { discount } = req.filtered;
            const foundProduct = await ormconfig_1.dataSourse
                .getRepository(product_entity_1.products)
                .findOne({
                where: {
                    productId: id,
                },
            })
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 503)));
            if (foundProduct) {
                const price = +foundProduct.price.split(" ").join("");
                const arr = [];
                const calc = (price - (price * discount) / 100)
                    .toString()
                    .split("")
                    .reverse()
                    .map((e, i, z, q = 1) => (i % 3 >= 1 ? arr.push(e) : arr.push(" ", e)));
                const NewPrice = arr.reverse().join("");
                const updateProduct = await ormconfig_1.dataSourse
                    .getRepository(product_entity_1.products)
                    .createQueryBuilder()
                    .update()
                    .set({ discount, discont_price: NewPrice })
                    .where({ productId: id })
                    .execute()
                    .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 503)));
                if (updateProduct) {
                    res.status(200).json({
                        message: "Updated succesfully",
                        status: 200,
                    });
                }
            }
            else {
                res.status(404).json({
                    message: "Not found",
                    status: 404,
                });
            }
        }
        catch (error) {
            throw new exceptions_1.ErrorHandler(error.message, 500);
        }
    },
};
