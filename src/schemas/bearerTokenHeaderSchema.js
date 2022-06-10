import Joi from "joi"

export const bearerTokenHeaderSchema = Joi.object({
	authorization: Joi.string()
		.pattern(/^Bearer\s[\w-]*\.[\w-]*\.[\w-]*$/)
		.required(),
}).options({ allowUnknown: true })

export default bearerTokenHeaderSchema
