import db from "../db/index.js"

export const getUrlId = async (req, res) => {
	const { id } = req.params
	try {
		const { rows } = await db.query(
			`--sql
            SELECT "shortUrls".id AS id, "shortUrls"."shortUrl", urls.url FROM "shortUrls"
            JOIN urls ON urls.id = "shortUrls"."urlId"
            WHERE "shortUrls"."id" = $1
        `,
			[id]
		)
		if (rows.length) return res.status(200).send({ rows })
		return res.sendStatus(404)
	} catch (err) {
		if (process.env.VERBOSE_MODE) console.log({ err })
		return res.sendStatus(500)
	}
}
