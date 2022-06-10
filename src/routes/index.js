import { Router } from "express"

import authRouter from "./authRoutes.js"
import authUrlsRouter from "./authUrlsRoutes.js"
import urlsRouter from "./urlsRoutes.js"
import usersRouter from "./usersRoutes.js"

const router = Router()

router.use(authRouter)
router.use(authUrlsRouter)
router.use(urlsRouter)
router.use(usersRouter)

export default router
