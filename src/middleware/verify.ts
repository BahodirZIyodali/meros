import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { NextFunction, Request, Response } from "express"
import { ErrorHandler } from "../exceptions/index"
import { verify } from "../utils/jwt"

dotenv.config()

export default (req: Request, res: Response, next: NextFunction) => {
  const { access_token } = req.headers

  if (!access_token) {
    return next(new ErrorHandler("Provided access token", 401))
  }

  const token = verify(access_token as string)

  req.filtered.id = token as string

  next()
}
