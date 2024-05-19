import { Model, Table, Column, DataType } from "sequelize-typescript"

@Table({
  tableName: "user",
})
export class User extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number | undefined

  @Column(DataType.STRING)
  name: string | undefined

  @Column(DataType.STRING)
  status: string | undefined
}
