import express, { NextFunction, Request, Response } from "express"

function createAndStartApplication() {
    const PORT = process.env.PORT || 8080
    const app = express()

    app.get(
        "/HealthCheck",
        (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json({ message: "Server is up and running! 🚀" })
        }
    )

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT} 🚀`)
    })
}

createAndStartApplication()
