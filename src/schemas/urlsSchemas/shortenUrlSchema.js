import Joi from "joi"

const shortenUrlSchema = Joi.object({
	url: Joi.string().uri().max(2048).required(),
})

export default shortenUrlSchema
