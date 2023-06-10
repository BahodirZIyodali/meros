import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { ErrorHandler } from "../exceptions"

export default (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { value, error } = schema.validate(req.body)

      if (error) {
        next(
          res.json({
            message: error.message,
          }),
        )
      }

      req.filtered = value
      next()
    } catch (error: any) {
      next(new ErrorHandler(error, 500))
    }
  }
}
