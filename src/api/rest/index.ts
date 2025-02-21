import express, { Application, Request, Response } from "express"
import path from "node:path"
import { globalErrorHandler } from "./config"
import { logger, responseMessage } from "@/configs"

const app: Application = express()

// middlewares
app.use(express.json({ limit: "2mb" }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "../", "public")))

app.use(logger.httpExpress)

app.get("/", (_: Request, response: Response) => {
    response.status(200).json({ message: responseMessage.OK })
})

app.use(globalErrorHandler)

export default app

