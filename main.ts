import { SequelizeConnectionModel } from "db/Sequelize"
;(async () => {
  const sequelize = new SequelizeConnectionModel()

  try {
    await sequelize.connect()
    console.log("Connect Postgresql Successfully!")
  } catch (e) {
    console.log("Connect Postgresql Failed:", (e as Error).message)
  }
})()
