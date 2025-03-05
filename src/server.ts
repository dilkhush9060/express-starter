import app from "@/api/rest"
import { createServer } from "node:http"
import { logger, myEnvironment } from "@/configs"

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const server = createServer(app)

server.listen(myEnvironment.PORT, () => {
    logger.info(`✅ Server is running on http://127.0.0.1:${myEnvironment.PORT}`)
})

// Handle server errors
server.on("error", (error) => {
    logger.error(`❌ Server error: ${error instanceof Error ? error.message : "Unknown error"}`)
    process.exit(1)
})

// Handle unexpected errors
process.on("uncaughtException", (error) => {
    logger.error(`💥 Uncaught Exception: ${error.message}`)
    process.exit(1)
})

process.on("unhandledRejection", (reason: unknown): void => {
    logger.error(`⚠️ Unhandled Rejection: ${String(reason)}`)
    process.exit(1)
})

