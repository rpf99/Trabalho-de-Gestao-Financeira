const userRepository = require("../repositories/userRepository")
const uRepo = new userRepository()

const bcrypt = require("bcrypt")

const passport = require("passport")
const local = require("passport-local").Strategy


passport.use(new local( 
    
    {  usernameField: 'email', passwordField: 'password'  },

    async(email, password, done) => {

            let user = await uRepo.findByEmail(email)

        if(user.length > 0){
            
            bcrypt.compare(password, user[0].password, (err, result)=>{
                
                if(err){
                    return done(err)
                }

                if(!result){
                    return done(null, false, {message:'Senha Inválida'})
                }

                return done(null, user[0])
            })

        }else{
            return done(null, {message:'Usuário não Localizado'})
        }
    }
))


passport.serializeUser( (user,done) =>{
    return done(null, {id: user.id} )
})


passport.deserializeUser( async(user,done) =>{
    let selectedUser = await uRepo.findById(user.id)
        
    return done(null, selectedUser[0])
})


module.exports=passport