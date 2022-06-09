import Joi from "joi"

const signInSchema = Joi.object({
	email: Joi.string().email().max(256).required(),
	password: Joi.string().required(),
})

export default signInSchema
