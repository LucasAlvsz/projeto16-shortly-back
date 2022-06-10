import { Router } from "express"

import { getUserById } from "../controllers/usersController.js"

import { bearerTokenValidate } from "../middlewares/bearerTokenValidate.js"
import bearerTokenHeaderSchema from "../schemas/bearerTokenHeaderSchema.js"

const usersRouter = Router()

usersRouter.get(
	"/users/:id",
	bearerTokenValidate(bearerTokenHeaderSchema),
	getUserById
)

export default usersRouter
