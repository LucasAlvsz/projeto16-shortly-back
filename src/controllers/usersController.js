import db from "../db/index.js"

export const getUserById = async (req, res) => {
	const { id } = req.params
	try {
		const user = await db.query(
			`--sql
        SELECT users.id, users.name, SUM("shortUrls".views) AS "visitCount"
        FROM users
            JOIN "shortUrls" ON "shortUrls"."userId" = users.id
        WHERE users.id = $1
        GROUP BY users.id
    `,
			[id]
		)
		const shortUrls = await db.query(
			`--sql
        SELECT "shortUrls".id, "shortUrls"."shortUrl", urls.url,
        SUM("shortUrls".views) AS "visitCount", urls.url
        FROM "shortUrls"
             JOIN urls ON urls.id = "shortUrls"."urlId"
             JOIN users ON users.id = "shortUrls"."userId"
        WHERE users.id = $1
        GROUP BY "shortUrls".id, urls.url
    `,
			[id]
		)
		if (!user.rows.length) return res.sendStatus(404)

		const userData = user.rows[0]
		const userShortUrls = shortUrls.rows
		res.status(200).send({ ...userData, shortnedUrls: userShortUrls })
	} catch (error) {
		if (process.env.VERBOSE_MODE) console.log({ error })
		if (error.code === "22P02") return res.sendStatus(404)
		res.sendStatus(500)
	}
}
