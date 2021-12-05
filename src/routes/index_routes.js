const express = require("express")
const route = express.Router()

const userRoute = require("./user_routes")

const evenues = require("./evenues_routes")
const revenues = require("./revenues_routes")
const finances = require("./finances_routes")


route.use("/",userRoute)
route.use("/admDespesas", evenues)
route.use("/admReceitas", revenues)
route.use("/Graphic", finances)


module.exports=route