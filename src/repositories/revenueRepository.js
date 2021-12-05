const Revenue = require("../model/revenue")

class RevenueRepository{

    insert(revenue){
        return Revenue.create({...revenue})
    }

    delete(id){
        return Revenue.destroy({where:{id}})
    }

    update(r, id){
        return Revenue.update({...r}, {where:{id}})
    }

    findById(id){
        return Revenue.findByPk(id)
    }

    findAllByUser(UserId){
        return Revenue.findAll({where:{UserId}})
    }
}

module.exports=RevenueRepository