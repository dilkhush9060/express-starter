import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import { HttpError } from "./httpError"
import { myEnvironment } from "@/configs"

export const AsyncErrorHandler = (function_: (request: Request, response: Response, next: NextFunction) => Promise<unknown>) => {
    return (request: Request, response: Response, next: NextFunction) => {
        Promise.resolve(function_(request, response, next)).catch(next)
    }
}

export const globalErrorHandler: ErrorRequestHandler = (error: HttpError, _: Request, response: Response) => {
    error.statusCode = error.statusCode || 50
    error.message = error.message || "Internal Server Error"

    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
        error.statusCode = 401
        error.message = "Unauthorized | " + (error.name === "TokenExpiredError" ? "Token expired" : "Invalid token")
    }

    response.status(error.statusCode).jsonp({
        statusCode: error.statusCode,
        status: error.status,
        message: error.message,
        error: myEnvironment.ENV == "development" ? error.err : undefined,
        stack: myEnvironment.ENV == "development" ? error.stack : undefined
    })
}

export const notFoundHandler = (_: Request, __: Response, next: NextFunction) => {
    const error = new HttpError("route not found", 404)
    next(error)
}

