import express, { Application, Request, Response } from "express"
import { dataSourse } from "./config/ormconfig"
import errorHandler from "./middleware/errorHandler"
import routes from "./modules/routes"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./docs.json"

const app: Application = express()

const main = async () => {
  try {
    await dataSourse.initialize()
    // app.use()
    app.use(express.json())
    app.use(routes)
    app.use(errorHandler)
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    app.all("/*", (_: Request, res: Response): any => res.sendStatus(404))
  } catch (error) {
    console.log(error)
  } finally {
    app.listen(9000, () => console.log(9000))
  }
}

main()
