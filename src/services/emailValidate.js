import db from "../db/index.js"

export const emailValidate = async email => {
	try {
		const { rows } = await db.query(
			`--sql
            SELECT * FROM users WHERE email = $1
        `,
			[email]
		)
		return rows
	} catch (err) {
		if (process.env.VERBOSE_MODE) console.log({ err })
		return -1
	} //FIXME
}

export default emailValidate
