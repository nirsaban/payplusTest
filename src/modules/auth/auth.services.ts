import jwt from "jsonwebtoken";
import { ENV } from "../../config/env";
import {ApiError} from "../../core/errors/apiError";

export class AuthService {
    signToken(payload: object) {
        return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: "1h" });
    }

    verifyToken(token: string) {
        try {
            return jwt.verify(token, ENV.JWT_SECRET) as jwt.JwtPayload;
        } catch (err) {
            throw ApiError.unauthorized("Invalid or expired token");
        }
    }
}