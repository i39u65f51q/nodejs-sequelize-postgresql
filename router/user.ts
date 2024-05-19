import { UserController } from "controller/user"
import { STATUS } from "enum/User"
import { Router, Request, Response, response } from "express"

export class UserRouter {
  constructor(router: Router, controller: UserController) {
    this.userApi(router, controller)
  }

  private userApi(router: Router, controller: UserController): void {
    router.get("/user/getAll", async (req: Request, res: Response) => {
      try {
        const result = await controller.getAll()
        res.status(200).json({ success: true, message: result })
      } catch {
        res.status(400).json({ success: false, message: "Request Error" })
      }
    })

    router.get("/user/get/:id", async (req: Request, res: Response) => {
      const { id } = req.params
      try {
        const result = await controller.getById(Number(id))
        res.status(200).send({ success: true, message: result })
      } catch {
        res.status(400).json({ success: false, message: "Request Error" })
      }
    })

    router.get("/user/status/:status", async (req: Request, res: Response) => {
      const { status } = req.params
      try {
        if (!(<any>Object).values(STATUS).includes(status)) {
          return res.send({ message: `status:${status} is invalid` })
        }
        const result = await controller.getByStatus(status)
        res.status(200).send({ success: true, message: result })
      } catch {
        res.status(400).json({ success: false, message: "Request Error" })
      }
    })

    router.post("/user/create", async (req: Request, res: Response) => {
      const { name } = req.body
      try {
        const result = await controller.create(name)
        res.status(200).send({ success: true, message: "ok" })
      } catch {
        res.status(400).json({ success: false, message: "Request Error" })
      }
    })

    router.patch("/user/update-status", async (req: Request, res: Response) => {
      const { id, status } = req.body
      try {
        if (!(<any>Object).values(STATUS).includes(status)) {
          return res.send({ message: `status:${status} is invalid` })
        }
        const result = await controller.updateStatus(id, status)
        res.status(200).send({ success: true, message: "ok" })
      } catch {
        res.status(400).json({ success: false, message: "Request Error" })
      }
    })
  }
}
