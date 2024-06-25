import { NextFunction, Router, Request, Response } from "express"
import { FormService } from "../services/form.service"
import { ApiResponse } from "../models/response.model"

export class FormController {
    public router: Router

    constructor(public service: FormService = new FormService()) {
        this.router = Router()
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get("/HealthCheck", this.check.bind(this))
        this.router.post("/", this.createForm.bind(this))
        this.router.get("/:id?", this.readForm.bind(this))
        this.router.put("/:id", this.updateForm.bind(this))
        this.router.delete("/:id", this.deleteForm.bind(this))
    }

    async check(req: Request, res: Response, next: NextFunction) {
        const apiResponse = new ApiResponse(
            "Form controller is up and running! 🚀",
            200
        )
        res.status(200).json(apiResponse)
    }

    async createForm(req: Request, res: Response, next: NextFunction) {
        try {
            const form = await this.service.create(
                req.body.form,
                req.body.fields
            )
            const apiResponse = new ApiResponse(
                "Form created successfully!",
                201,
                form
            )
            res.status(201).json(apiResponse)
        } catch (error) {
            next(error)
        }
    }

    async readForm(req: Request, res: Response, next: NextFunction) {
        try {
            const fields = await this.service.read(
                req.params.id,
                req.body.filter
            )
            const apiResponse = new ApiResponse(
                `Form${req.params.id ? "" : "s"} retrieved successfully!`,
                200,
                fields
            )
            res.status(200).json(apiResponse)
        } catch (error) {
            next(error)
        }
    }

    async updateForm(req: Request, res: Response, next: NextFunction) {
        try {
            const form = await this.service.update(req.params.id, req.body)
            const apiResponse = new ApiResponse(
                "Form updated successfully!",
                200,
                form
            )
            res.status(200).json(apiResponse)
        } catch (error) {
            next(error)
        }
    }

    async deleteForm(req: Request, res: Response, next: NextFunction) {
        try {
            const form = await this.service.delete(req.params.id)
            const apiResponse = new ApiResponse(
                "Form deleted successfully!",
                204,
                form
            )
            res.status(204).send(apiResponse)
        } catch (error) {
            next(error)
        }
    }
}
