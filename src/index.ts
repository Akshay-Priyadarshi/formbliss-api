import express, { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"

const createAndStartApplication = async () => {
    const APP_ENV = process.env.APP_ENV || "production"

    const app = express()

    if (APP_ENV === "development") {
        dotenv.config({ path: ".env" })
    }
    const PORT = process.env.PORT || 8080

    app.get(
        "/HealthCheck",
        (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json({ message: "Server is up and running! 🚀" })
        }
    )

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT} 🚀`)
    })
}

createAndStartApplication()
