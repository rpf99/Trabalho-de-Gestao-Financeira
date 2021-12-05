const Evenue = require("../model/evenue")

class EvenueRepository{

    insert(evenue){
        return Evenue.create({...evenue})
    }

    delete(id){
        return Evenue.destroy({where:{id}})
    }

    update(e, id){
        return Evenue.update({...e}, {where:{id}})
    }

    findById(id){
        return Evenue.findByPk(id)
    }

    findAllByUser(UserId){
        return Evenue.findAll({where:{UserId}})
    }
}

module.exports=EvenueRepository