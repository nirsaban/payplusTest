import { createLogger, format, transports } from "winston";
import { ENV } from "./env";

const logger = createLogger({
    level: ENV.LOG_LEVEL || "debug",
    format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [new transports.Console()],
});

export default logger;
