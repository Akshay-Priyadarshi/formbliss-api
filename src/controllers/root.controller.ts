import { Router, Request, Response, NextFunction } from "express"
import { FieldController } from "./field.controller"
import { FieldService } from "../services/field.service"
import { ApiResponse } from "../models/response.model"

export const RootController = Router()

RootController.get(
    "/HealthCheck",
    (req: Request, res: Response, next: NextFunction) => {
        const apiResponse = new ApiResponse("Server is up and running! 🚀", 200)
        res.status(200).json(apiResponse)
    }
)

RootController.use("/fields", new FieldController().router)
