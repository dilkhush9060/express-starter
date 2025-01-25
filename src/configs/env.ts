import dotenvFlow from "dotenv-flow"
dotenvFlow.config()

const _env = {
    ENV: process.env.ENV,
    PORT: process.env.PORT || 5000
}

export const myEnv = Object.freeze(_env)

