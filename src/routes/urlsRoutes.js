import { Router } from "express"

import { getUrlId } from "../controllers/urlsController.js"

const urlsRouter = Router()

urlsRouter.get("urls/:id", getUrlId)

export default urlsRouter
