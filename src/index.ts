import express from "express"
import dotenv from "dotenv"
import { RootController } from "./controllers/root.controller"
import { MongooseClient } from "./clients/mongoose.client"
import { ErrorMiddleware } from "./middlewares/error.middleware"

const createAndStartApplication = async () => {
    const APP_ENV = process.env.APP_ENV || "production"

    const app = express()

    app.use(express.json())

    if (APP_ENV === "development") {
        dotenv.config({ path: ".env" })
    }
    const PORT = process.env.PORT || 8080

    app.use("/", RootController)

    app.use(ErrorMiddleware)

    await MongooseClient.connect()

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT} 🚀`)
    })
}

createAndStartApplication()
