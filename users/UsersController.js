const express = require("express");
//Necessita dessa variavel visto que vamos chamar rotas apartir daqui alem do inde.js
const router = express.Router();
const User = require("./User");
const bcrypt= require('bcryptjs');
const session = require("express-session");

router.get("/admin/users",(req,res)=>{
    User.findAll().then(users =>{
        //passa uma lista de usuarios para a view
        res.render("admin/users/index",{users:users});
    });
});

router.get("/admin/users/create",(req,res)=>{
    res.render("admin/users/create");
});

router.post("/users/create",(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;

    //verifica se tem email duplicado
    User.findOne({where:{email:email}}).then(user=>{
        if(user == undefined){ 

            var salt = bcrypt.genSaltSync(10);//numero de base para o hash
            var hash = bcrypt.hashSync(password, salt);//criação do hash
        
        
        
            User.create({
                email:email,
                password:hash
            }).then(()=>{
                res.redirect("/");
            }).catch((err)=>{
                res.redirect("/");
            });
        

        }else{
            res.redirect("/admin/users/create"); 
        }
    });


   
});

//Rota do formulario de login
router.get("/login",(req,res)=>{
    res.render("admin/users/login");
});


//Rota para o login
router.post("/authenticate", (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email: email}}).then(user => {
        if(user != undefined){ // Se existe um usuário com esse e-mail
            // Validar senha
            var correct = bcrypt.compareSync(password,user.password);

            if(correct){//se tudo correto cria a seção
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles");
            }else{
                res.redirect("/login"); 
            }

        }else{
            res.redirect("/login");
        }
    });

});

router.get("/logout",(req,res)=>{
    req.session.user =undefined;
    res.redirect("/");
});

module.exports =router;