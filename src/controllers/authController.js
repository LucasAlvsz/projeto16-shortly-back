import db from "../db/index.js"
import encryptsPassword from "../utils/encryptsPassword.js"
import JWTGenerator from "../utils/JWTGenerator.js"
import JWTVerify from "../utils/JWTVerify.js"

export const signUp = async (req, res) => {
	const { name, email } = req.body
	const password = encryptsPassword(req.body.password)
	try {
		db.query(
			`--sql
	        INSERT INTO users (name, email, password)
	        VALUES ($1, $2, $3)
	    `,
			[name, email, password]
		)
		res.sendStatus(201)
	} catch (err) {
		if (process.env.VERBOSE_MODE) console.log({ err })
		res.sendStatus(500)
	}
}

export const signIn = async (req, res) => {
	const { userData } = res.locals
	const token = JWTGenerator(userData)
	res.status(200).send(token)
	//TODO: add a session to the user
}
