/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
export class HttpError extends Error {
    statusCode: number
    message: string
    status: string
    err: Error | unknown

    constructor(message: string, statusCode: number, error?: Error | unknown) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.status = statusCode < 500 ? "fail" : "error"
        this.err = error
    }
}

