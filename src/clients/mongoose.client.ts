import mongoose from "mongoose"

export class MongooseClient {
    static async connect() {
        const MONGODB_URL = process.env.MONGODB_URL
        if (!MONGODB_URL) {
            throw new Error("MONGODB_URL is not set as environment variable!")
        }
        await mongoose.connect(MONGODB_URL, {})
        console.log("Connected to MongoDB 🚀")
    }

    static async disconnect() {
        await mongoose.disconnect()
        console.log("Disconnected to MongoDB 🚀")
    }
}