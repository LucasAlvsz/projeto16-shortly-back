import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import "dotenv/config"

dotenv.config()

import router from "./routes/index.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

app.get("/", async (req, res) => {
	res.send("Hello World!")
})

app.listen(process.env.PORT || 5000, () => {
	console.clear()
	console.log(`Server is running on port ${process.env.PORT || 5000} 🐱‍👤`)
})
