import { Router, Request, Response, NextFunction } from "express"
import { FieldService } from "../services/field.service"
import { ApiResponse } from "../models/response.model"

export class FieldController {
    public router: Router

    constructor(public service: FieldService = new FieldService()) {
        this.router = Router()
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get("/HealthCheck", this.check.bind(this))
        this.router.post("/", this.createField.bind(this))
        this.router.get("/:id?", this.readField.bind(this))
        this.router.patch("/:id", this.updateField.bind(this))
        this.router.delete("/:id", this.deleteField.bind(this))
    }

    async check(req: Request, res: Response, next: NextFunction) {
        const apiResponse = new ApiResponse(
            "Field controller is up and running! 🚀",
            200
        )
        res.status(200).json(apiResponse)
    }

    async createField(req: Request, res: Response, next: NextFunction) {
        try {
            const field = await this.service.createField(
                req.body.field,
                req.body.nestedFields
            )
            const apiResponse = new ApiResponse(
                "Field created successfully!",
                201,
                field
            )
            res.status(201).json(field)
        } catch (error) {
            next(error)
        }
    }

    async readField(req: Request, res: Response, next: NextFunction) {
        try {
            const fields = await this.service.readField(
                req.params.id,
                req.body.filter
            )
            const apiResponse = new ApiResponse(
                `Field${req.params.id ? "" : "s"} retrieved successfully!`,
                200,
                fields
            )
            res.status(200).json(apiResponse)
        } catch (error) {
            next(error)
        }
    }

    async updateField(req: Request, res: Response, next: NextFunction) {
        try {
            const field = await this.service.updateField(
                req.params.id,
                req.body
            )
            const apiResponse = new ApiResponse(
                "Field updated successfully!",
                200,
                field
            )
            res.status(200).json(apiResponse)
        } catch (error) {
            next(error)
        }
    }

    async deleteField(req: Request, res: Response, next: NextFunction) {
        try {
            const field = await this.service.deleteField(req.params.id)
            const apiResponse = new ApiResponse(
                "Field deleted successfully!",
                204,
                field
            )
            res.status(204).send(apiResponse)
        } catch (error) {
            next(error)
        }
    }
}
