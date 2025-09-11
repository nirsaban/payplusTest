import { Request, Response, NextFunction } from "express";
import logger from "../../config/logger";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    logger.error(err.message || "Unknown error");
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
}