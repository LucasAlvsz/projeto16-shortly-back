import { nanoid } from "nanoid"

import db from "../db/index.js"
import findOnRows from "../utils/findOnRows.js"

export const shortenUrl = async (req, res) => {
	const { url } = req.body
	const { id } = res.locals.userData
	try {
		const { rows } = await db.query(
			`--sql
			SELECT "shortUrls"."shortUrl", "shortUrls"."userId" FROM urls 
    		JOIN "shortUrls" ON "shortUrls"."urlId" = urls.id
    		WHERE url = $1
		`,
			[url]
		)
		if (rows.length) {
			const shortUrl = findOnRows(rows, "userId", id)
			if (shortUrl)
				return res.status(201).send({ shortUrl: shortUrl.shortUrl })
			else {
				const newShortUrl = nanoid()
				await db.query(
					`--sql
					INSERT INTO "shortUrls" ("shortUrl", "userId","urlId")
					VALUES ($1, $2, $3)
				`,
					[newShortUrl, id, shortUrl.urlId]
				)
				return res.status(201).send({ shortUrl: newShortUrl })
			}
		}
		const newShortUrl = nanoid()
		const result = await db.query(
			`--sql
			INSERT INTO urls ("url")
			VALUES ($1)
			RETURNING id
		`,
			[url]
		)
		const urlId = result.rows[0].id
		await db.query(
			`--sql
			INSERT INTO "shortUrls" ("shortUrl", "userId","urlId")
			VALUES ($1, $2, $3)
		`,
			[newShortUrl, id, urlId]
		)
		return res.status(201).send({ shortUrl: newShortUrl })
	} catch (err) {
		if (process.env.VERBOSE_MODE) console.log({ err })
		if (err.code === "23505") return shortenUrl(req, res)
		res.sendStatus(500)
	}
}
