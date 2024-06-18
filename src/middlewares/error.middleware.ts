import { NextFunction, Response, Request } from "express"
import { BadRequestError } from "../errors/bad-request.error"
import { ApiResponse } from "../models/response.model"

export const ErrorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err)
    let apiResponse: ApiResponse | null = null
    if (err instanceof BadRequestError) {
        apiResponse = new ApiResponse(err.message, 400)
    } else {
        apiResponse = new ApiResponse("Internal server error!", 500)
    }
    res.status(apiResponse.statusCode).json(apiResponse)
}
