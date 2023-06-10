"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../../config/ormconfig");
const rate_entity_1 = require("../../entities/rate.entity");
const exceptions_1 = require("../../exceptions");
exports.default = {
    UPDATE_RATE: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { star } = req.filtered;
            const rate = await ormconfig_1.dataSourse
                .getRepository(rate_entity_1.Evaluation)
                .findOne({
                where: {
                    Products: { productId: id },
                },
            })
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (!rate) {
                const newRate = await ormconfig_1.dataSourse
                    .getRepository(rate_entity_1.Evaluation)
                    .createQueryBuilder()
                    .insert()
                    .into(rate_entity_1.Evaluation)
                    .values({ increment: 1, star: star, average: star, Products: id })
                    .returning("*")
                    .execute()
                    .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
                if (newRate) {
                    return res.status(201).json({
                        message: "Successful",
                        status: 201,
                    });
                }
            }
            else if (rate) {
                const idstar = rate?.id;
                const increment = rate?.increment + 1;
                const stars = rate?.star + star;
                const average = +(stars / increment).toFixed(2);
                const updateRate = (await ormconfig_1.dataSourse
                    .getRepository(rate_entity_1.Evaluation)
                    .createQueryBuilder()
                    .update(rate_entity_1.Evaluation)
                    .set({ increment, star: stars, average })
                    .where({ id: idstar })
                    .returning("*")
                    .execute());
                if (updateRate) {
                    res.status(200).json({
                        message: "Successful",
                        status: 200,
                    });
                }
            }
        }
        catch (err) {
            throw next(new exceptions_1.ErrorHandler(err.message, 500));
        }
    },
};
