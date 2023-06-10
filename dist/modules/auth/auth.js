"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../../config/ormconfig");
const users_entity_1 = require("../../entities/users.entity");
const exceptions_1 = require("../../exceptions");
const jwt_1 = require("../../utils/jwt");
exports.default = {
    POST_REGISTOR: async (req, res, next) => {
        const { user_number, user_name, user_mail, password } = req.filtered;
        const findUser = await ormconfig_1.dataSourse.getRepository(users_entity_1.users).findOne({
            where: {
                user_name,
                password,
            },
        });
        if (findUser) {
            res.status(400).json({
                status: 200,
                message: "User has already registered",
                data: findUser,
            });
        }
        else {
            const newUser = await ormconfig_1.dataSourse
                .getRepository(users_entity_1.users)
                .createQueryBuilder()
                .insert()
                .into(users_entity_1.users)
                .values({ user_number, password, user_mail, user_name })
                .returning("*")
                .execute();
            if (newUser) {
                res.status(201).json({
                    status: 201,
                    message: "user created",
                    token: (0, jwt_1.sign)(newUser.identifiers[0].user_id),
                    data: newUser,
                });
            }
        }
    },
    LOGIN: async (req, res, next) => {
        const { user_number, password } = req.filtered;
        const findUser = await ormconfig_1.dataSourse.getRepository(users_entity_1.users).findOne({
            where: {
                user_number,
                password,
            },
        });
        if (!findUser) {
            res.status(400).json({
                status: 200,
                message: "User not found",
            });
        }
        else {
            res.status(200).json({
                status: 201,
                message: "user found",
                token: (0, jwt_1.sign)(findUser.user_id),
                data: findUser,
            });
        }
    },
    UPDATE: async (req, res, next) => {
        try {
            const { id, user_number, user_name, user_mail, password, user_surname, user_was_born, user_s, user_img } = req.filtered;
            const updateUser = await ormconfig_1.dataSourse
                .createQueryBuilder()
                .update(users_entity_1.users)
                .set({ user_number, user_name, user_mail, password, user_surname, user_was_born, user_s, user_img })
                .where({ user_id: id })
                .returning("*")
                .execute();
            if (updateUser) {
                res.status(200).json({
                    status: 200,
                    message: "User Update",
                    data: updateUser,
                });
            }
        }
        catch (error) {
            throw new exceptions_1.ErrorHandler(error.message, 500);
        }
    },
};
