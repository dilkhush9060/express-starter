import { Request, Response, NextFunction, ErrorRequestHandler } from "express"

export type AppRequest = Request
export type AppResponse = Response
export type AppNextFunction = NextFunction
export type AppErrorRequestHandler = ErrorRequestHandler

declare global {
    namespace Express {
        interface User {
            id: string
            role: string
            email: string
            phone: string
            name: string
        }

        interface Request {
            token?: string
            tokenData?: object
            user?: User
        }
    }
}

