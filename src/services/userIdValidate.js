import db from "../db/index.js"

export const userIdValidate = async id => {
	try {
		const { rows } = await db.query(
			`--sql
            SELECT users.id FROM users WHERE users.id = $1
        `,
			[id]
		)
		return rows[0]
	} catch (error) {
		if (process.env.VERBOSE_MODE) console.log({ err })
		return -1
	}
}

export default userIdValidate
