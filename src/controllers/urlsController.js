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
		if (rows.length) return res.status(200).send(rows[0])
		return res.sendStatus(404)
	} catch (err) {
		if (process.env.VERBOSE_MODE) console.log({ err })
		if (err.code === "22P02") return res.sendStatus(404)
		return res.sendStatus(500)
	}
}

export const openShortUrl = async (req, res) => {
	const { shortUrl } = req.params
	try {
		const { rows } = await db.query(
			`--sql
            UPDATE "shortUrls" SET views = views + 1 
            WHERE "shortUrl" = $1
            RETURNING (SELECT urls.url FROM urls WHERE urls.id = "shortUrls"."urlId") AS url
        `,
			[shortUrl]
		)
		if (!rows.length) return res.sendStatus(404)
		return res.redirect(rows[0].url)
	} catch (err) {
		if (process.env.VERBOSE_MODE) console.log({ err })
		if (err.code === "22P02") return res.sendStatus(404)
		return res.sendStatus(500)
	}
}
