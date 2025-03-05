import path from "node:path"
import morgan from "morgan"
import express, { Application, NextFunction, Request, Response } from "express"
import { globalErrorHandler, HttpError, notFoundHandler } from "./config"

const app: Application = express()

// middlewares
app.use(express.json({ limit: "2mb" }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "../", "public")))
app.use(morgan("combined"))

app.get("/", (_: Request, response: Response, next: NextFunction) => {
    return next(new HttpError("my error", 400))
    response.status(200).json({ message: "server is running" })
})

app.use(notFoundHandler)
app.use(globalErrorHandler)

export default app

