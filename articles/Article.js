/*Esse arquivo é responsavel pela criação da tabela articles*/
const Sequelize = require("sequelize");
const connection = require("../database/database");
//Importação do modulo category para relacionamento do article
const Category =require("../categories/Category");

const Article = connection.define('articles',{
    title:{
        type:Sequelize.STRING,
        allowNull:false
    }, slug:{
        type: Sequelize.STRING,
        allowNull:false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull:false
    }
});
//Uma categoria tem muitos artigos  1 para muitos
Category.hasMany(Article);
//Um artigo pertence a uma categoria relacionamento 1 para 1
Article.belongsTo(Category);
//Força a atualização da tabela no banco usar apenas quando for criar as tabelas
//Article.sync({force:true});

module.exports = Article
