/*Esse arquivo é responsavel pela criação da tabela categories*/
const Sequelize = require("sequelize");
const connection = require("../database/database");
//Cria a tabela
const User = connection.define('users',{
    email:{//campo da tabela
        type:Sequelize.STRING,
        allowNull:false
    }, password:{//campo da tabela
        type: Sequelize.STRING,
        allowNull:false
    }
});

/*Força a atualização da tabela no banco usar apenas quando for criar as tabelas
Se estiver true ele sempre recria a tabela se tiver false ele verifica se tem e se
não tem ele cria */

//User.sync({force:false});

module.exports = User
