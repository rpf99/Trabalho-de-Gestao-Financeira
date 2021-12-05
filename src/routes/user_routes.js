const express = require("express")

const route = express.Router()

const passport = require("passport")

const UserRepository = require("../repositories/userRepository")
const uRepo = new UserRepository()

const bcrypt = require('bcrypt')
let saltRounds = 12



route.get("/home", async(req,res)=>{

    if(req.user != null){
        console.log(req.user.name)
    }

    res.render("pages/home", {user:req.user})
})


route.get('/signup', (req,res)=>{
    res.render("pages/signup",{error:null, values:null, user:req.user})
})


route.post("/signup", async(req,res)=>{

        let name = req.body.name
        let email = req.body.email
        let password = req.body.password
        let confirmPassword = req.body.confirm
    
        let values = {name:name, email:email, password:password, confirm:confirmPassword}
    

    if(name && email && password && confirmPassword){    

        if(email.length < 8){                
               res.render('pages/signup',{error:'Email Inválido', values:values, user:req.user})
        }else{

               let user = await uRepo.findByEmail(email)

            if(user.length > 0){
                    res.render('pages/signup',{error:"Usuário já existe", values:values, user:req.user})
            }else{
                    
                if(password.length > 6){

                    if(password == confirmPassword){

                        bcrypt.hash(password, saltRounds, (_,hash)=>{

                            uRepo.insert({name:name, email:email, password:hash})          

                            res.render('pages/login', {msg:'Usuário cadastrado com sucesso',
                                                       error:null, user:req.user})
                        })

                    }else{    
                        res.render('pages/signup', {error:'As duas senhas não são compatíveis',
                                                    values:values, user:req.user})
                    }

                }else{
                    res.render('pages/signup', {error:'Senha não recomendada',values:values, user:req.user})
                }
            }
        }
       
    }else{
        res.render('pages/signup', {error:'Os parametros apresentados deveriam estar preenchidos',
                                    values:values, user:req.user})
    }
})


route.get('/login', async(req,res)=>{
    res.render('pages/login', {error: req.flash('error')[0], msg:null, user:req.user})
})


route.post('/login', passport.authenticate('local', {
        successRedirect:'/home',
        failureRedirect:'/login',
        failureFlash:true
}))


route.post('/logOut', async(req,res) =>{
    req.logOut()
    res.redirect('/login')
})


module.exports=route