import uniqueEmailValidation from "../services/uniqueEmailValidation.js"

export const signUpValidation = async (req, res, next) => {
	const uniqueEmailValidated = await uniqueEmailValidation(req.body.email)
	if (uniqueEmailValidated)
		return res.status(422).send("email, This email is already taken")
	else if (uniqueEmailValidated === -1) return res.sendStatus(500)
	next()
}
