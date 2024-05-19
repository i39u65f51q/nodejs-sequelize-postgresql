import { Model, ModelCtor, Sequelize } from "sequelize-typescript"
import { config } from "dotenv"
import { User } from "models/User"
config()

export class PostgresConnectionModel {
  private readonly sequelize: Sequelize
  constructor() {
    this.sequelize = new Sequelize({
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      dialect: "postgres",
    })
  }

  public connect(): Promise<void> {
    return this.sequelize.authenticate()
  }

  public async close(): Promise<void> {
    return this.sequelize.close()
  }

  //if table is existed , then replace
  public force(): Promise<Sequelize> {
    return this.sequelize.sync({ force: true })
  }

  public addModels(models: ModelCtor<Model>[]) {
    this.sequelize.addModels(models)
  }
}
