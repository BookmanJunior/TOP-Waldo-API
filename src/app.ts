import express from "express"
import logger from "morgan"
import { configDotenv } from "dotenv"

configDotenv()
const app = express()
const port = process.env.PORT || 3000;


app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.listen(port, () => {
  console.log(`Starting server on port ${port}`)
})
