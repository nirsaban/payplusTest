import { Request, Response } from "express";
import { route, POST, before } from "awilix-express";
import { UserService } from "./user.service";
import {loginSchema, registerSchema} from "./user.validation";
import {LoginUserDTO} from "./dtos/login.dto";
import {IRegisterDTO} from "./dtos/register.dto";
import {validate} from "../../core/middleware/validate";
import logger from "../../config/logger";
@route("/users")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @POST()
    @route("/register")
    @before([validate(registerSchema)])
    async register(req: Request, res: Response) {
        console.log("Register called ✅", req.body); // should print
        const dto: IRegisterDTO = req.body;
        const result = await this.userService.register(dto);
        res.status(201).json(result);
    }

    @POST()
    @route("/login")
    @before([validate(loginSchema)])
    async login(req: Request, res: Response) {
        const dto: LoginUserDTO = req.body;
        const result = await this.userService.login(dto);
        res.json(result);
    }
}