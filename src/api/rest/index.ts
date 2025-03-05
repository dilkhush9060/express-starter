import path from "node:path"
import express, { Application } from "express"
import { globalErrorHandler, httpLogger, notFoundHandler } from "./config"
import { AppRequest, AppResponse, AppNextFunction } from "@/types"

const app: Application = express()

// middlewares
app.use(express.json({ limit: "2mb" }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "../", "public")))
app.use(httpLogger)

// health check
app.get("/", (_: AppRequest, response: AppResponse, _next: AppNextFunction) => {
    response.status(200).json({ status: "ok", statusCode: 200, message: "server is running" })
})

// 404
app.use(notFoundHandler)

// global error handle
app.use(globalErrorHandler)

export default app

