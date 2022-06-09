import Joi from "joi"

const signUpSchema = Joi.object({
	name: Joi.string().max(200).required(),
	email: Joi.string().email().max(256).required(),
	password: Joi.string().min(8).max(12).required(),
	confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
})

export default signUpSchema
