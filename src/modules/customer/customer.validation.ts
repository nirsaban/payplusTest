import Joi from "joi";

export const createCustomerSchema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    phoneNumber: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .optional()
        .messages({
            "string.pattern.base": "phoneNumber must be digits only (10–15 chars)",
        }),
    birthDay: Joi.date().iso().optional(),
});
