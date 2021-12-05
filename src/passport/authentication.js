module.exports = function(req,res,next){
 
    if(req.isAuthenticated()){
        return next()
    }

    req.flash('error','o usuário deveria estar cadastrado')
    res.redirect('/login')
}