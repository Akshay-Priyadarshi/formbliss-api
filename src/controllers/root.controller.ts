import { Router, Request, Response, NextFunction } from "express"
import { FormController } from "./form.controller"

export const RootController = Router()

RootController.get(
    "/HealthCheck",
    (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({ message: "Server is up and running! 🚀" })
    }
)

RootController.use("/forms", FormController)
