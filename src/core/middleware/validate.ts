import { Request, Response, NextFunction, RequestHandler } from "express";
import { Schema } from "joi";
import {ApiError} from "../errors/apiError";

export function validate(schema: Schema): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            next(ApiError.badRequest(error.details.map((d) => d.message).join(", ")));
            return;
        }
        next();
    };
}