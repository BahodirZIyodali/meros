"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostOrderSchema = exports.UpdateDiscountSchema = exports.UpdateRateSchema = exports.UpdateProductSchema = exports.PostProductSchema = exports.UpdateCommentSchema = exports.PostCommentSchema = exports.UpdateSubSubCategorySchema = exports.PostSubSubCategorySchema = exports.UpdateSubCategorySchema = exports.PostSubCategorySchema = exports.PostCategorySchema = exports.UpdatePostSchema = exports.LoginPostSchema = exports.RegistorPostSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RegistorPostSchema = joi_1.default.object({
    user_name: joi_1.default.string().required().max(64),
    password: joi_1.default.string().required().max(125),
    user_number: joi_1.default.string().required().max(64),
    user_mail: joi_1.default.string().required().max(125),
});
exports.LoginPostSchema = joi_1.default.object({
    user_number: joi_1.default.string().required().max(64),
    password: joi_1.default.string().required().max(125),
});
exports.UpdatePostSchema = joi_1.default.object({
    user_name: joi_1.default.string().max(64),
    password: joi_1.default.string().max(125),
    user_number: joi_1.default.string().max(64),
    user_mail: joi_1.default.string().max(125),
    user_surname: joi_1.default.string().max(64),
    user_was_born: joi_1.default.number(),
    user_s: joi_1.default.string().max(15),
    user_img: joi_1.default.string().max(200),
});
exports.PostCategorySchema = joi_1.default.object({
    title: joi_1.default.string().required().max(128),
});
exports.PostSubCategorySchema = joi_1.default.object({
    title: joi_1.default.string().required().max(125),
    category_id: joi_1.default.string().required(),
});
exports.UpdateSubCategorySchema = joi_1.default.object({
    title: joi_1.default.string().max(125),
    category_id: joi_1.default.string(),
});
exports.PostSubSubCategorySchema = joi_1.default.object({
    title: joi_1.default.string().required().max(125),
    sub_category_id: joi_1.default.string().required(),
});
exports.UpdateSubSubCategorySchema = joi_1.default.object({
    title: joi_1.default.string().max(125),
    sub_id: joi_1.default.string(),
});
exports.PostCommentSchema = joi_1.default.object({
    ProductId: joi_1.default.string().required(),
    userId: joi_1.default.string().required(),
    commentary: joi_1.default.string().required().max(600),
});
exports.UpdateCommentSchema = joi_1.default.object({
    ProductId: joi_1.default.string(),
    userId: joi_1.default.string(),
    commentary: joi_1.default.string().max(600),
});
exports.PostProductSchema = joi_1.default.object({
    sub_sub_id: joi_1.default.string().required(),
    title: joi_1.default.string().required().max(200),
    price: joi_1.default.string().required().max(64),
    discont_price: joi_1.default.number(),
    brand: joi_1.default.string().required().max(64),
    size: joi_1.default.string().required(),
    author: joi_1.default.string().required().max(128),
    description: joi_1.default.string().required().max(128),
    color: joi_1.default.string().required().max(64),
    made_in: joi_1.default.string().required().max(64),
    discount: joi_1.default.number(),
    img: joi_1.default.string().required(),
    img1: joi_1.default.string(),
    img2: joi_1.default.string(),
    img3: joi_1.default.string(),
    img4: joi_1.default.string(),
});
exports.UpdateProductSchema = joi_1.default.object({
    sub_sub_id: joi_1.default.string(),
    title: joi_1.default.string().max(200),
    price: joi_1.default.string().max(64),
    discont_price: joi_1.default.number(),
    brand: joi_1.default.string().max(64),
    size: joi_1.default.string(),
    author: joi_1.default.string().max(128),
    description: joi_1.default.string().max(128),
    color: joi_1.default.string().max(64),
    made_in: joi_1.default.string().max(64),
    discount: joi_1.default.number(),
    img: joi_1.default.string(),
    img1: joi_1.default.string(),
    img2: joi_1.default.string(),
    img3: joi_1.default.string(),
    img4: joi_1.default.string(),
});
exports.UpdateRateSchema = joi_1.default.object({
    star: joi_1.default.number().required(),
});
exports.UpdateDiscountSchema = joi_1.default.object({
    discount: joi_1.default.number().required(),
});
exports.PostOrderSchema = joi_1.default.object({
    ProductId: joi_1.default.string().required(),
    count: joi_1.default.number().required(),
});
