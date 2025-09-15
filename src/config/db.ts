import { Sequelize } from "sequelize-typescript";
import { ENV } from "./env";

// Import models here
import { User } from "../modules/user/user.model";
import { Customer } from "../modules/customer/customer.model";

// @ts-ignore
export const sequelize = new Sequelize({
    dialect: "postgres",
    // url: ENV.DATABASE_URL, // loaded from .env.*
    host: 'localhost',
    port:5432,
    username: 'nir.saban',
    // password: ENV.DB_PASSWORD,
    database: 'mydb',
    logging: ENV.NODE_ENV === "development" ? console.log : false,
    models: [User, Customer], // auto-load models
});