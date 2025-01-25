import { Logger } from "@rohit2005/logger"
import { myEnv } from "./env"
export const logger = new Logger({ logFiles: myEnv.ENV === "production" ? true : false })

