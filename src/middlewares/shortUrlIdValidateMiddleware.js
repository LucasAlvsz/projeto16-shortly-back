import shortUrlIdValidate from "../services/shortUrlIdValidate.js"
import idParamsSchema from "../schemas/authUrlsSchemas/idParamsSchema.js"

export const shortUrlIdValidateMiddleware = async (req, res, next) => {
	const { error } = idParamsSchema.validate(req.params)
	if (error)
		return res.status(404).send(error.details.map(({ message }) => message))
	const { id } = req.params
	const userId = res.locals.userData.id
	const result = await shortUrlIdValidate(id)
	if (!result.length) return res.sendStatus(404)
	if (result[0].userId !== userId) return res.sendStatus(401)
	if (result === -1) return res.sendStatus(500)
	next()
}
