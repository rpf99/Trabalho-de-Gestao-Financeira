const User = require("../model/user")

class UserRepository{

    insert(u){
        return User.create({...u})
    }

    findAll(){
        return User.findAll()
    }

    findById(id){
        return User.findAll({where:{id}})
    }

    findByEmail(email){
        return User.findAll({where:{email}})
    }

    delete(id){
        return User.destroy({where:{id}})
    }
 
    deleteByEmail(email){
        return User.destroy({where:{email}})
    }
}

module.exports=UserRepository