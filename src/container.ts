import { createContainer, asClass, asValue } from "awilix";
import { sequelize } from "./config/db";
import {AuthService} from "./modules/auth/auth.services";
import {UserService} from "./modules/user/user.service";
import {CustomerService} from "./modules/customer/customer.services";
import {UserController} from "./modules/user/user.controller";
import {CustomerController} from "./modules/customer/customer.controller";


const container = createContainer({ injectionMode: "CLASSIC" });

container.register({
    sequelize: asValue(sequelize),

    // Services
    authService: asClass(AuthService).scoped(),
    userService: asClass(UserService).scoped(),
    customerService: asClass(CustomerService).scoped(),

    // Controllers
    userController: asClass(UserController).scoped(),
    customerController: asClass(CustomerController).scoped(),
});

export default container;
