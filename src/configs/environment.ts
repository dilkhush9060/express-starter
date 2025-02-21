import dotenvFlow from "dotenv-flow"
dotenvFlow.config()

const _environment = {
    ENV: process.env.ENV,
    PORT: process.env.PORT || 5000
}

export const myEnvironment = Object.freeze(_environment)

