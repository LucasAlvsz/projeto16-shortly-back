import { Router } from "express"

import { signUp } from "../controllers/authController.js"

import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware.js"
import { signUpValidation } from "../middlewares/authMiddleware.js"

import signUpSchema from "../schemas/authSchemas/signUpSchema.js"

const authRouter = Router()

authRouter.post(
	"/signUp",
	schemaValidateMiddleware(signUpSchema),
	signUpValidation,
	signUp
)

export default authRouter
