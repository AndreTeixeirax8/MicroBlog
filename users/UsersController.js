const express = require("express");
//Necessita dessa variavel visto que vamos chamar rotas apartir daqui alem do inde.js
const router = express.Router();
const User = require("./User");
const bcrypt= require('bcryptjs');

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

module.exports =router;