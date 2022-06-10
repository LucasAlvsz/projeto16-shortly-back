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
	} catch (err) {
		if (process.env.VERBOSE_MODE) console.log({ err })
		if (error.code === "22P02") return res.sendStatus(404)
		res.sendStatus(500)
	}
}

export const getRanking = async (req, res) => {
	try {
		const { rows } = await db.query(`--sql
			SELECT users.id, users.name,
			COUNT("shortUrls"."userId") as "linkCount",
			COALESCE(SUM("shortUrls".views),0) as "visitCount"
			FROM users
				LEFT JOIN "shortUrls" ON "shortUrls"."userId" = users.id
			GROUP BY users.id
			ORDER BY "linkCount" DESC LIMIT 10
		`)
		res.status(200).send(rows)
	} catch (error) {
		if (process.env.VERBOSE_MODE) console.log({ err })
		res.sendStatus(500)
	}
}
