import Joi from "joi"

export const idParamsSchema = Joi.object({
	id: Joi.number().integer().required(),
})

export default idParamsSchema
