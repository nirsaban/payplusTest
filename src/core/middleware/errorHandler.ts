import { Request, Response, NextFunction } from "express";
import logger from "../../config/logger";
import {ApiError} from "../errors/apiError";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        logger.warn(`[${err.statusCode}] ${err.message}`);
        return res.status(err.statusCode).json({ error: err.message });
    }
    console.log(`[${err.statusCode}] ${err.message}`);
    logger.error(`[500] ${err.message || "Internal Server Error"}`);
    return res.status(500).json({ error: "Internal Server Error" });
}
