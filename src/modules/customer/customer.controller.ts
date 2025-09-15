import { RequestHandler } from "express";
import { route, POST, GET, before } from "awilix-express";
import { createCustomerSchema } from "./customer.validation";
import { CreateCustomerDTO } from "./dtos/customer.dto";
import { authMiddleware } from "../../core/middleware/authMiddleware";
import { Router, Request, Response, NextFunction } from 'express';
import {CustomerService} from "./customer.services";
import { validate } from "../../core/middleware/validate";
@route("/customers")
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @POST()
    @before([
        ((req: any, res: Response, next: NextFunction) =>
            authMiddleware(req.container.resolve("authService"))(req, res, next)) as RequestHandler,
        validate(createCustomerSchema),
    ])
    async create(req: any, res: Response) {
        const dto: CreateCustomerDTO = req.body;
        const userId = req.user.id;
        const customer = await this.customerService.create(userId, dto);
        res.status(201).json(customer);
    }

    @GET()
    @before([
        ((req: any, res, next) =>
            authMiddleware(req.container.resolve("authService"))(req, res, next)) as RequestHandler,
    ])
    async list(req: Express.Request, res: Response) {
        const userId = req.user.id;
        const customers = await this.customerService.getAllByUser(userId);
        res.json(customers);
    }
}
