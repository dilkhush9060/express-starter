import dotenvFlow from "dotenv-flow"
dotenvFlow.config()

const _environment = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 5000
}

export const myEnvironment = Object.freeze(_environment)

