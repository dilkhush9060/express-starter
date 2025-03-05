import pino, { LoggerOptions } from "pino"

const options: LoggerOptions = {
    level: "info",
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
        targets: [
            {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "yyyy-mm-dd HH:MM:ss",
                    ignore: "pid,hostname",
                    singleLine: true
                }
            },
            {
                target: "pino/file",
                options: {
                    destination: "./logs/info.log",
                    mkdir: true,
                    append: true
                },
                level: "info"
            },
            {
                target: "pino/file",
                options: {
                    destination: "./logs/warn.log",
                    mkdir: true,
                    append: true
                },
                level: "warn"
            },
            {
                target: "pino/file",
                options: {
                    destination: "./logs/error.log",
                    mkdir: true,
                    append: true
                },
                level: "error"
            }
        ],
        dedupe: true
    }
}

export const logger = pino(options)

