import app from "@/api/rest"
// import { createServer } from "http"
import { logger, myEnv } from "@/configs"
const server = app.listen(myEnv.PORT)

;(() => {
    try {
        logger.info(`server is running on http://127.0.0.1:${myEnv.PORT}`)
    } catch (err) {
        logger.error(err instanceof Error ? err.message : "unknown error")

        server.close((error) => {
            if (error) {
                logger.error("unknown error")
            }
            process.exit(1)
        })
    }
})()

