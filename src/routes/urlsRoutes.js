import { Router } from "express"

import { getUrlId, openShortUrl } from "../controllers/urlsController.js"

const urlsRouter = Router()

urlsRouter.get("/urls/:id", getUrlId)
urlsRouter.get("/urls/open/:shortUrl", openShortUrl)

export default urlsRouter
