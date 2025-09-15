import { AwilixContainer } from "awilix";
import { AuthService } from "../modules/auth/auth.service";

declare global {
    namespace Express {
        interface Request extends Express.Request{
            container: AwilixContainer<{
                authService: AuthService;
            }>;
            user?: any;
            body?: any;
        }
    }
}



declare module "express-serve-static-core" {
    interface Request {
        container: AwilixContainer; // make container always available
        user?: any;                 // attach user after auth
    }
}