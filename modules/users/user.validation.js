import Joi from "joi";

const signUpValidationSchema = Joi.object({
    userName: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z]{3,8}$/).required(),
    age: Joi.number().min(10).max(30),
    phone: Joi.string(),
    gender: Joi.string(),
    isVerified: Joi.boolean(),
    oldPassword: Joi.string(),
    newPassword: Joi.string(),
    isLoggedIn: Joi.boolean().required(),

});

const signInValidationSchema = Joi.object({
    email: Joi.string().email({tlds: {allow: ["com", "net"]}}).required(),
    password: Joi.string().pattern(/^[A-Z][a-z]{3,8}$/).required(),
    isLoggedIn: Joi.boolean().required()

});

export {
    signUpValidationSchema,
    signInValidationSchema
}