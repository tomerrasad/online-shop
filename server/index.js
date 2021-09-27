const express = require("express")
const cors = require("cors")
const path  = require("path")
const app = express()
require('dotenv').config()
const port = process.env.PORT || 1000


app.use(cors())
app.use(express.json())
app.use("/", require("./routes/auth"))
app.use("/", require("./routes/cart"))
app.use("/", require("./routes/prod"))
app.use("/recipes",express.static(path.join(__dirname,"recipes")))



app.listen(port, ()=>console.log("rockin'" + port))
