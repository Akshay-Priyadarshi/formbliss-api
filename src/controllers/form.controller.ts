import { Router, Request, Response, NextFunction } from "express"
import { FormService } from "../services/form.service"

export const FormController = Router()
const formService = new FormService()

FormController.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json(await formService.readForm())
    }
)
