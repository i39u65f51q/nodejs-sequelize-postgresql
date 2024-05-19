import { STATUS } from "enum/User"
import { User } from "models/User"
import { Model, ModelCtor } from "sequelize-typescript"

export class UserController {
  private readonly model: ModelCtor
  constructor() {
    this.model = User
  }

  public async getById(id: number) {
    return this.model.findOne({
      attributes: ["id", "name", "status"],
      where: { id },
    })
  }

  public async getByStatus(status: string) {
    return this.model.findOne({
      attributes: ["id", "name", "status"],
      where: { status },
    })
  }

  public async getAll() {
    return this.model.findAll({
      attributes: ["id", "name", "status"],
    })
  }

  public async create(name: string) {
    return this.model.create({
      name,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  public async updateStatus(id: number, status: STATUS) {
    return this.model.update({ status }, { where: { id } })
  }
}
