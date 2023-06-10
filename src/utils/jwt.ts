import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const sign = (payload: string) => jwt.sign(payload, String(process.env.SECRET_KEY))
export const verify = (token: string) => jwt.verify(token, String(process.env.SECRET_KEY))





