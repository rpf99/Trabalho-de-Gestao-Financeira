const {Model, DataTypes} = require('sequelize')
const sequelize = require("../database/index")

const User = require("./user")

class Evenue extends Model{}

Evenue.init(
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
        modelName:'Evenue',
        tableName:'evenues'
    })


User.hasMany(Evenue)
Evenue.belongsTo(User)

module.exports=Evenue