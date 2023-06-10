import Joi from "joi"

export const RegistorPostSchema = Joi.object({
  user_name: Joi.string().required().max(64),
  password: Joi.string().required().max(125),
  user_number: Joi.string().required().max(64),
  user_mail: Joi.string().required().max(125),
})

export const LoginPostSchema = Joi.object({
  user_number: Joi.string().required().max(64),
  password: Joi.string().required().max(125),
})

export const UpdatePostSchema = Joi.object({
  user_name: Joi.string().max(64),
  password: Joi.string().max(125),
  user_number: Joi.string().max(64),
  user_mail: Joi.string().max(125),
  user_surname: Joi.string().max(64),
  user_was_born: Joi.number(),
  user_s: Joi.string().max(15),
  user_img: Joi.string().max(200),
})

export const PostCategorySchema = Joi.object({
  title: Joi.string().required().max(128),
})
export const PostSubCategorySchema = Joi.object({
  title: Joi.string().required().max(125),
  category_id: Joi.string().required(),
})
export const UpdateSubCategorySchema = Joi.object({
  title: Joi.string().max(125),
  category_id: Joi.string(),
})

export const PostSubSubCategorySchema = Joi.object({
  title: Joi.string().required().max(125),
  sub_category_id: Joi.string().required(),
})
export const UpdateSubSubCategorySchema = Joi.object({
  title: Joi.string().max(125),
  sub_id: Joi.string(),
})

export const PostCommentSchema = Joi.object({
  ProductId: Joi.string().required(),
  userId: Joi.string().required(),
  commentary: Joi.string().required().max(600),
})
export const UpdateCommentSchema = Joi.object({
  ProductId: Joi.string(),
  userId: Joi.string(),
  commentary: Joi.string().max(600),
})

export const PostProductSchema = Joi.object({
  sub_sub_id: Joi.string().required(),
  title: Joi.string().required().max(200),
  price: Joi.string().required().max(64),
  discont_price: Joi.number(),
  brand: Joi.string().required().max(64),
  size: Joi.string().required(),
  author: Joi.string().required().max(128),
  description: Joi.string().required().max(128),
  color: Joi.string().required().max(64),
  made_in: Joi.string().required().max(64),
  discount: Joi.number(),
  img: Joi.string().required(),
  img1: Joi.string(),
  img2: Joi.string(),
  img3: Joi.string(),
  img4: Joi.string(),
})

export const UpdateProductSchema = Joi.object({
  sub_sub_id: Joi.string(),
  title: Joi.string().max(200),
  price: Joi.string().max(64),
  discont_price: Joi.number(),
  brand: Joi.string().max(64),
  size: Joi.string(),
  author: Joi.string().max(128),
  description: Joi.string().max(128),
  color: Joi.string().max(64),
  made_in: Joi.string().max(64),
  discount: Joi.number(),
  img: Joi.string(),
  img1: Joi.string(),
  img2: Joi.string(),
  img3: Joi.string(),
  img4: Joi.string(),
})

export const UpdateRateSchema = Joi.object({
  star: Joi.number().required(),
})

export const UpdateDiscountSchema = Joi.object({
  discount: Joi.number().required(),
})

export const PostOrderSchema = Joi.object({
  ProductId: Joi.string().required(),
  count: Joi.number().required(),
})
