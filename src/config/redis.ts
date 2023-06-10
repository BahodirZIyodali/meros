import { createClient } from "redis"
import { ErrorHandler } from "../exceptions"

export const fetchRedis = async () => {
  const client = createClient({
    url: "redis://127.0.0.1:6379",
  })

  try {
    client.on("error", (err) => new ErrorHandler("Error in Redis", 422))
    client.on("connect", () => console.log("Redis  Client Connected"))
    await client.connect()

    return client
  } catch (error) {
    throw new ErrorHandler("Error in Redis", 422)
  }
}
