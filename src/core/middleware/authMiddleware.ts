import { Request, Response, NextFunction } from "express";
import {AuthService} from "../../modules/auth/auth.services";
import {ApiError} from "../errors/apiError";


// Extend Express Request
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware =
    (authService: { verifyToken: (arg0: string) => any; }) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers["authorization"];

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                throw ApiError.unauthorized("No token provided");
            }

            const token = authHeader.split(" ")[1];
            const payload = authService.verifyToken(token);

            req.user = payload;
            next();
        } catch (err) {
            next(err);
        }
    };
