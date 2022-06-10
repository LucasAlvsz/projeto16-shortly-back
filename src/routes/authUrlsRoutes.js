import { Router } from "express"

import { shortenUrl } from "../controllers/authUrlsController.js"

import { bearerTokenValidate } from "../middlewares/bearerTokenValidate.js"
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware.js"

import bearerTokenValidateSchema from "../schemas/bearerTokenHeaderSchema.js"
import shortenUrlSchema from "../schemas/urlsSchemas/shortenUrlSchema.js"

const authUrlsRoutes = Router()

authUrlsRoutes.post(
	"/urls/shorten",
	bearerTokenValidate(bearerTokenValidateSchema),
	schemaValidateMiddleware(shortenUrlSchema),
	shortenUrl
)

export default authUrlsRoutes
