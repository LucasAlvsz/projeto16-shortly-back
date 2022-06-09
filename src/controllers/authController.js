import db from "../db/index.js"
import encryptsPassword from "../utils/encryptsPassword.js"

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
