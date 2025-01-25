/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express"

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

