import { Logger } from "@rohit2005/logger"
import { myEnvironment } from "./environment"
export const logger = new Logger({ logFiles: myEnvironment.ENV === "production" ? true : false })

