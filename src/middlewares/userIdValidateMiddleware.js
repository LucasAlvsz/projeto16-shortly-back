import idParamsSchema from "../schemas/authUrlsSchemas/idParamsSchema.js"
import userIdValidate from "../services/userIdValidate.js"

export const userIdValidateMiddleware = async (req, res, next) => {
	const { error } = idParamsSchema.validate(req.params, { abortEarly: false })
	if (error)
		return res.status(422).send(error.details.map(({ message }) => message))

	const { id } = req.params
	const validId = await userIdValidate(id)
	if (!validId) return res.sendStatus(404)
	if (validId === -1) return res.sendStatus(500)
	next()
}
