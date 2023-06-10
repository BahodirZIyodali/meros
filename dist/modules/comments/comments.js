"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../../config/ormconfig");
const comments_entity_1 = require("../../entities/comments.entity");
const exceptions_1 = require("../../exceptions");
exports.default = {
    GET: async (req, res, next) => {
        try {
        }
        catch (error) {
            throw new exceptions_1.ErrorHandler(error.message, 500);
        }
    },
    POST: async (req, res, next) => {
        try {
            const { ProductId, userId, commentary } = req.filtered;
            const addComment = await ormconfig_1.dataSourse
                .getRepository(comments_entity_1.Comments)
                .createQueryBuilder()
                .insert()
                .into(comments_entity_1.Comments)
                .values({ products: ProductId, users: userId, commentary })
                .returning("*")
                .execute()
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 503)));
            if (addComment) {
                res.status(201).json({
                    status: 201,
                    message: "Add comment",
                    data: addComment,
                });
            }
        }
        catch (error) {
            throw new exceptions_1.ErrorHandler(error.message, 500);
        }
    },
    PUT: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { ProductId, userId, commentary } = req.filtered;
            const UpdateComment = await ormconfig_1.dataSourse
                .getRepository(comments_entity_1.Comments)
                .createQueryBuilder()
                .update()
                .set({ products: ProductId, users: userId, commentary })
                .where({ comment_id: id })
                .returning("*")
                .execute()
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 503)));
            if (UpdateComment) {
                res.status(200).json({
                    status: 200,
                    message: "Update comment",
                    data: UpdateComment,
                });
            }
        }
        catch (error) {
            throw new exceptions_1.ErrorHandler(error.message, 500);
        }
    },
    DELETE: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleteComment = await ormconfig_1.dataSourse
                .getRepository(comments_entity_1.Comments)
                .createQueryBuilder()
                .delete()
                .from(comments_entity_1.Comments)
                .where({ comment_id: id })
                .returning("*")
                .execute()
                .catch((error) => next(new exceptions_1.ErrorHandler(error.message, 500)));
            if (deleteComment) {
                res.status(200).json({
                    status: 200,
                    message: "Delete comment",
                    data: deleteComment,
                });
            }
        }
        catch (error) {
            throw new exceptions_1.ErrorHandler(error.message, 500);
        }
    },
};
