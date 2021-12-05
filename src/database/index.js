const { Sequelize } = require("sequelize/dist");

const sequelize = new Sequelize(         
    process.env.DB_name,  
    process.env.DB_username,  
    process.env.DB_password,
    {dialect: process.env.DB_dialect}  
)

module.exports=sequelize