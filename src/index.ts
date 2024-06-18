import express from "express"
import dotenv from "dotenv"
import { RootController } from "./controllers/root.controller"

const createAndStartApplication = async () => {
    const APP_ENV = process.env.APP_ENV || "production"

    const app = express()

    if (APP_ENV === "development") {
        dotenv.config({ path: ".env" })
    }
    const PORT = process.env.PORT || 8080

    app.use("/", RootController)

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT} 🚀`)
    })
}

createAndStartApplication()
