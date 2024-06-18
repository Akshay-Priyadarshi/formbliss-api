import { Router, Request, Response, NextFunction } from "express"
import { FormService } from "../services/form.service"
import { ApiResponse } from "../models/response.model"

export const FormController = Router()
const formService = new FormService()

FormController.get(
    "/:formId?",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const formReadRes = await formService.readForm(req.params.formId)
            const apiResponse = new ApiResponse(
                `Form${req.params.formId === undefined ? "s" : ""} read successfully!`,
                200,
                formReadRes
            )
            res.status(apiResponse.statusCode).json(apiResponse)
        } catch (error) {
            next(error)
        }
    }
)

FormController.post(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const formCreateRes = await formService.createForm(req.body)
            const apiResponse = new ApiResponse(
                `Form created successfully!`,
                200,
                formCreateRes
            )
            res.status(apiResponse.statusCode).json(apiResponse)
        } catch (error) {
            next(error)
        }
    }
)

FormController.patch(
    "/:formId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const formUpdateRes = await formService.updateForm(
                req.params.formId,
                req.body
            )
            const apiResponse = new ApiResponse(
                `Form updated successfully!`,
                200,
                formUpdateRes
            )
            res.status(apiResponse.statusCode).json(apiResponse)
        } catch (error) {
            next(error)
        }
    }
)

FormController.delete(
    "/:formId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const formDeleteRes = await formService.deleteForm(
                req.params.formId
            )
            const apiResponse = new ApiResponse(
                `Form deleted successfully!`,
                200,
                formDeleteRes
            )
            res.status(apiResponse.statusCode).json(apiResponse)
        } catch (error) {
            next(error)
        }
    }
)
