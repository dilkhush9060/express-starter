import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import { HttpError } from "./httpError"
import { logger, myEnvironment } from "@/configs"

// Type for async handler
type AsyncHandler = (request: Request, response: Response, next: NextFunction) => Promise<unknown>

export const AsyncErrorHandler = (function_: AsyncHandler) => {
    return (request: Request, response: Response, next: NextFunction): void => {
        Promise.resolve(function_(request, response, next)).catch(next)
    }
}

export const globalErrorHandler: ErrorRequestHandler = (error: HttpError | Error, _request: Request, response: Response) => {
    logger.info("global")

    let statusCode = 500
    let message = "Internal Server Error"

    if (error instanceof HttpError) {
        statusCode = error.statusCode || 500
        message = error.message || "Internal Server Error"
    }

    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
        statusCode = 401
        message = `Unauthorized | ${error.name === "TokenExpiredError" ? "Token expired" : "Invalid token"}`
    }

    const responseBody = {
        statusCode,
        status: statusCode >= 400 && statusCode < 600 ? "error" : "success",
        message,
        ...(myEnvironment.NODE_ENV === "development" && {
            error: error instanceof HttpError ? error.error : error,
            stack: error.stack
        })
    }

    response.status(statusCode).json(responseBody)
}

export const notFoundHandler = (request: Request, _response: Response, next: NextFunction): void => {
    const error = new HttpError(`Route not found: ${request.method} ${request.originalUrl}`, 404)
    next(error)
}

