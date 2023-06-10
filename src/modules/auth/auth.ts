import { NextFunction, Request, Response } from "express"
import { dataSourse } from "../../config/ormconfig"
import { users } from "../../entities/users.entity"
import { ErrorHandler } from "../../exceptions"
import { sign } from "../../utils/jwt"

export default {
  POST_REGISTOR: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_number, user_name, user_mail, password } = req.filtered

    const findUser = await dataSourse.getRepository(users).findOne({
      where: {
        user_name,
        password,
      },
    })

    if (findUser) {
      res.status(400).json({
        status: 200,
        message: "User has already registered",
        data: findUser,
      })
    } else {
      const newUser = await dataSourse
        .getRepository(users)
        .createQueryBuilder()
        .insert()
        .into(users)
        .values({ user_number, password, user_mail, user_name })
        .returning("*")
        .execute()

      if (newUser) {
        res.status(201).json({
          status: 201,
          message: "user created",
          token: sign(newUser.identifiers[0].user_id),
          data: newUser,
        })
      }
    }
  },
  LOGIN: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_number, password } = req.filtered

    const findUser = await dataSourse.getRepository(users).findOne({
      where: {
        user_number,
        password,
      },
    })

    if (!findUser) {
      res.status(400).json({
        status: 200,
        message: "User not found",
      })
    } else {
      res.status(200).json({
        status: 201,
        message: "user found",
        token: sign(findUser.user_id),
        data: findUser,
      })
    }
  },
  UPDATE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id, user_number, user_name, user_mail, password, user_surname, user_was_born, user_s, user_img } =
        req.filtered as any

      const updateUser = await dataSourse
        .createQueryBuilder()
        .update(users)
        .set({ user_number, user_name, user_mail, password, user_surname, user_was_born, user_s, user_img })
        .where({ user_id: id })
        .returning("*")
        .execute()

      if (updateUser) {
        res.status(200).json({
          status: 200,
          message: "User Update",
          data: updateUser,
        })
      }
    } catch (error: any) {
      throw new ErrorHandler(error.message, 500)
    }
  },
}
