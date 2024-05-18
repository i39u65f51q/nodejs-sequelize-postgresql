import { Sequelize } from "sequelize"
import { config } from "dotenv"
const { DB_DATABASE, DB_HOST, DB_USER, DB_PASSWORD } = config().parsed as any

export class SequelizeConnectionModel {
  private readonly sequelize: Sequelize
  constructor() {
    this.sequelize = new Sequelize({
      username: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      database: DB_DATABASE,
      dialect: "postgres",
    })
  }

  public connect(): Promise<void> {
    return this.sequelize.authenticate()
  }
}
