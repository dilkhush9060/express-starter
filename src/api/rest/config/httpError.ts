/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
export class HttpError extends Error {
    statusCode: number
    status: string
    error: Error | unknown

    constructor(message: string, statusCode: number, error?: Error | unknown) {
        super(message)
        this.statusCode = statusCode
        this.status = statusCode < 500 ? "fail" : "error"
        this.error = error
    }
}

