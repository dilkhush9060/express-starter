export class HttpError extends Error {
    public statusCode: number
    public error?: unknown

    constructor(message: string, statusCode: number, error?: unknown) {
        super(message)
        this.name = "HttpError"
        this.statusCode = statusCode
        this.error = error
        Object.setPrototypeOf(this, HttpError.prototype)
    }
}

