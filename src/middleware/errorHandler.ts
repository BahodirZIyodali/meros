import { NextFunction, Request, Response } from "express"
import http from "http"
import { ErrorHandler } from "../exceptions"

export default (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorHandler) {
    res.status(err.status).json({
      message: err.message,
      status: err.status,
    })
    return
  }

  res.status(500).json({
    message: "Internal Server Error",
    status: 500,
  })
}
