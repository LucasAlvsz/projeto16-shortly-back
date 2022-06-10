import db from "../db/index.js"

export const shortUrlIdValidate = async id => {
	try {
		const { rows } = await db.query(
			`--sql
        SELECT * FROM "shortUrls"
        WHERE "shortUrls".id = $1
    `,
			[id]
		)
		return rows
	} catch (err) {
		if (process.env.VERBOSE_MODE) console.log({ err })
		return -1
	}
}

export default shortUrlIdValidate
