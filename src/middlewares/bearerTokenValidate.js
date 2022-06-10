import JWTVerify from "../utils/JWTVerify.js"

export const bearerTokenValidate = schema => {
	return (bearerTokenValidate[schema] = (req, res, next) => {
		const { error } = schema.validate(req.headers, { abortEarly: false })
		if (error)
			return res
				.status(401)
				.send(error.details.map(({ message }) => message))
		try {
			const token = req.headers.authorization.split(" ")[1]
			const userData = JWTVerify(token)
			res.locals.userData = userData
			next()
		} catch (err) {
			if (process.env.VERBOSE_MODE) console.log({ err })
			return res.sendStatus(401)
		}
	})
}
