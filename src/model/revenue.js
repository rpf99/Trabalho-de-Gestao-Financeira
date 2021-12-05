const {Model, DataTypes} = require('sequelize')
const sequelize = require("../database/index")

const User = require("./user")

class Revenue extends Model{}

Revenue.init(
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:false
        },

        value:{
            type:DataTypes.FLOAT,
            allowNull:false,
            unique:false
        }
    },

    {
        sequelize,
        modelName:'Revenue',
        tableName:'revenues'
    })


User.hasMany(Revenue)
Revenue.belongsTo(User)

module.exports=Revenue