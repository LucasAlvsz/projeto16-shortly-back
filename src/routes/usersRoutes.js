import { Router } from "express"

import { getUserById, getRanking } from "../controllers/usersController.js"

import { userIdValidateMiddleware } from "../middlewares/userIdValidateMiddleware.js"
import { bearerTokenValidate } from "../middlewares/bearerTokenValidate.js"
import bearerTokenHeaderSchema from "../schemas/bearerTokenHeaderSchema.js"

const usersRouter = Router()

usersRouter.get(
	"/users/:id",
	bearerTokenValidate(bearerTokenHeaderSchema),
	userIdValidateMiddleware,
	getUserById
)
usersRouter.get("/ranking", getRanking)

export default usersRouter
