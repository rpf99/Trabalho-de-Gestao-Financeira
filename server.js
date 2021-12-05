require('dotenv').config()

const express = require('express')

const app = express()
const port = 5500

const sequelize = require('./src/database')
const routes = require('./src/routes/index_routes')


const expressLayouts = require("express-ejs-layouts")

const cookieParser = require("cookie-parser")
const cFlash = require("connect-flash")
const eSession = require("express-session")

const passport = require("./src/passport/passport_auth")


app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))


app.use(eSession(
    {
        secret: process.env.Session_Secret_Password, 
        saveUninitialized: true,
        cookie: { secure:false, maxAge:60*20*1000 },
    }))
    

app.use(cookieParser())
app.use(cFlash())

app.use(passport.initialize())
app.use(passport.session())

app.use("/",routes)


app.listen(port, async()=>{
    try{
        await sequelize.sync()
    }catch(error){
        console.log(error)
    }
})