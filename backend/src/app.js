import express from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "50kb" }))
app.use(express.static("public"))
app.use(cookieParser())

import { router } from "./routes/router.js"
app.use(router)

export { app }