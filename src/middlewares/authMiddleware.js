import emailValidate from "../services/emailValidate.js"
import decryptPassword from "../utils/decryptPassword.js"

export const signUpValidation = async (req, res, next) => {
	const existingEmailValidation = await emailValidate(req.body.email)
	if (existingEmailValidation.length)
		return res.status(422).send("email, This email is already taken")
	else if (existingEmailValidation === -1) return res.sendStatus(500)
	next()
}

export const signInValidation = async (req, res, next) => {
	const [existingUserValidation] = await emailValidate(req.body.email)
	if (!existingUserValidation)
		return res.status(401).send("Incorrect email or password")
	else if (existingUserValidation === -1) return res.sendStatus(500)
	const { id, name, email, password } = existingUserValidation
	if (!decryptPassword(req.body.password, password))
		return res.status(401).send("Incorrect email or password")
	res.locals.userData = { id, name, email }
	next()
}
