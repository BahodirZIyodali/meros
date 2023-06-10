import { DataSource } from "typeorm"
import path from "path"

import dotenv from "dotenv"

dotenv.config()

export const dataSourse = new DataSource({
  type: "postgres",
  host: String(process.env.host),
  port: 5432,
  database: String(process.env.database),
  username: String(process.env.database),
  password: String(process.env.password),
  entities: [path.resolve(__dirname, "..", "entities", "*.entity.{ts,js}")],
  migrations: [path.resolve(__dirname, "..", "migrations", "**/*.ts")],
  logging: true,
  synchronize: false,
})
