import express, { Application, Request } from "express"
import path from "path"
import { globalErrorHandler } from "./config"
import { logger, responseMessage } from "@/configs"

const app: Application = express()

// middlewares
app.use(express.json({ limit: "2mb" }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "../", "public")))

app.use(logger.httpExpress)

app.get("/", (_: Request, res) => {
    res.status(200).json({ message: responseMessage.OK })
})

app.use(globalErrorHandler)

export default app

