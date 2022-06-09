import jwt from "jsonwebtoken"

export const JWTVerify = token => {
	try {
		const data = jwt.verify(token, process.env.JWT_SECRET)
		return data
	} catch (err) {
		if (process.env.VERBOSE_MODE) console.log({ err })
		res.sendStatus(500)
	}
}

export default JWTVerify
