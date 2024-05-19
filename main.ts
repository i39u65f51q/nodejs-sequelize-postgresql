import { UserController } from "controller/user"
import cors from "cors"
import { PostgresConnectionModel } from "db/postgres"
import { STATUS } from "enum/User"
import express, { Router } from "express"
import { User } from "models/User"
import { UserRouter } from "router/user"

async function main(): Promise<void> {
  const app: express.Application = express()
  const router = Router()
  const postgres = new PostgresConnectionModel()

  try {
    postgres.addModels([User])

    await postgres.connect()
    await postgres.force()
    console.log("Connect Postgresql Successfully!")
  } catch (e) {
    console.log("Connect Postgresql Failed:", (e as Error).message)
  }

  new UserRouter(router, new UserController())

  app.use(express.json())
  app.use(cors(), router)
  app.listen(3300)

  await pushFake()
}
main()

async function pushFake() {
  const fake = [
    { name: "Alan", status: STATUS.PENDING },
    { name: "Ben", status: STATUS.REFUSED },
  ]
  for (const f of fake) {
    await User.create({
      name: f.name,
      status: f.status,
    })
  }
}
