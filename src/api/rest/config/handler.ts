import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import { HttpError } from "./httpError"
import { myEnv } from "@/configs"

export const AsyncErrorHandler = (func: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(func(req, res, next)).catch(next)
    }
}

export const globalErrorHandler: ErrorRequestHandler = (err: HttpError, _: Request, res: Response) => {
    err.statusCode = err.statusCode || 50
    err.message = err.message || "Internal Server Error"

    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
        err.statusCode = 401
        err.message = "Unauthorized | " + (err.name === "TokenExpiredError" ? "Token expired" : "Invalid token")
    }

    res.status(err.statusCode).jsonp({
        statusCode: err.statusCode,
        status: err.status,
        message: err.message,
        error: myEnv.ENV == "development" ? err.err : undefined,
        stack: myEnv.ENV == "development" ? err.stack : undefined
    })
}

export const notFoundHandler = (_: Request, __: Response, next: NextFunction) => {
    const err = new HttpError("route not found", 404)
    next(err)
}

