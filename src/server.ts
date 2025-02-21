import app from "@/api/rest"
// import { createServer } from "http"
import { logger, myEnvironment } from "@/configs"
const server = app.listen(myEnvironment.PORT)

;(() => {
    try {
        logger.info(`server is running on http://127.0.0.1:${myEnvironment.PORT}`)
    } catch (error) {
        logger.error(error instanceof Error ? error.message : "unknown error")

        server.close((error) => {
            if (error) {
                logger.error("unknown error")
            }
            process.exit(1)
        })
    }
})()

