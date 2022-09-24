const express = require("express")
const app = express()
require("dotenv").config({path: __dirname+"/.env"})
const port = process.env.PORT || 3000
app.use("/public",express.static(__dirname+"/public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(require("./routes/router"))
app.listen(port, console.log(`Application running on port ${port}`))
