require("dotenv").config()

const cors = require("cors")
const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", (error) => console.error())
db.once("open", () => console.log("Connected to database"))

app.use(cors())
app.use(express.json())

const jokesRouter = require("./routes/jokes")
app.use("/jokes", jokesRouter)

app.listen(3000, () => console.log("Server Started"))