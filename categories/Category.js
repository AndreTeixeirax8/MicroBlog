/*Esse arquivo é responsavel pela criação da tabela categories*/
const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define('categories',{
    title:{
        type:Sequelize.STRING,
        allowNull:false
    }, slug:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

//Força a atualização da tabela no banco usar apenas quando for criar as tabelas
//Category.sync({force:true});

module.exports = Category
