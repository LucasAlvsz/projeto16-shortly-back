import { Router } from "express"

import { signUp, signIn } from "../controllers/authController.js"

import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware.js"
import {
	signUpValidation,
	signInValidation,
} from "../middlewares/authMiddleware.js"

import signUpSchema from "../schemas/authSchemas/signUpSchema.js"
import signInSchema from "../schemas/authSchemas/signInSchema.js"

const authRouter = Router()

authRouter.post(
	"/signup",
	schemaValidateMiddleware(signUpSchema),
	signUpValidation,
	signUp
)

authRouter.post(
	"/signin",
	schemaValidateMiddleware(signInSchema),
	signInValidation,
	signIn
)

export default authRouter
