import Joi from "joi";

export const registerSchema = Joi.object({
    idNumber: Joi.string()
        .pattern(/^[0-9]{9}$/)
        .required()
        .messages({
            "string.pattern.base": "idNumber must be exactly 9 digits",
        }),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .messages({ "any.only": "Passwords do not match" }),
    fullName: Joi.string().min(2).max(100).optional(),
});

export const loginSchema = Joi.object({
    idNumber: Joi.string()
        .pattern(/^[0-9]{9}$/)
        .required()
        .messages({
            "string.pattern.base": "idNumber must be exactly 9 digits",
        }),
    password: Joi.string().required(),
});