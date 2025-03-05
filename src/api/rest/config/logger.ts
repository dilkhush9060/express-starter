import { logger } from "@/configs"
import { AppRequest, AppResponse } from "@/types"
import pinoHttp from "pino-http"
import useragent from "useragent"
import { Socket } from "node:net"

interface ParsedUserAgent {
    os: {
        toString(): string
    }
    toAgent(): string
}

interface CustomRequest extends AppRequest {
    headers: {
        "user-agent"?: string
        "x-forwarded-for"?: string
    }

    connection: Socket & {
        remoteAddress?: string | undefined
    }
}

export const httpLogger = pinoHttp({
    logger,
    serializers: {
        req: (request: CustomRequest) => {
            const userAgentString = request.headers["user-agent"] || ""

            const agent = useragent.parse(userAgentString) as ParsedUserAgent

            return {
                method: request.method,
                url: request.url,
                ip:
                    request.headers["x-forwarded-for"] ||
                    request.connection?.remoteAddress ||
                    request.socket?.remoteAddress ||
                    request.ip ||
                    "unknown",
                userAgent: userAgentString,
                device: {
                    platform: agent.os.toString(),
                    browser: agent.toAgent()
                }
            }
        },
        res: (response: AppResponse) => ({
            statusCode: response.statusCode
        })
    }
})

