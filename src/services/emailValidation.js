import db from "../db/index.js"

export const emailValidation = async email => {
	try {
		const { rows } = await db.query(
			`--sql
            SELECT * FROM users WHERE email = $1
        `,
			[email]
		)
		return rows[0]
	} catch (err) {
		if (process.env.VERBOSE_MODE) console.log({ err })
		return -1
	} //FIXME
}

export default emailValidation
