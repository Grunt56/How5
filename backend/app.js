const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const port = 3000
const userRoutes = require("./routes/userRoutes")
const scheduleRoutes = require("./routes/scheduleRoutes")

app.use(cors())
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.send("hello")
})

app.use("/usuarios", userRoutes)
app.use("/agendamentos", scheduleRoutes)

app.listen(port, function(){
    console.log("funcionou")
})