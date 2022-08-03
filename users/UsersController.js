const express = require("express");
//Necessita dessa variavel visto que vamos chamar rotas apartir daqui alem do inde.js
const router = express.Router();
const User = require("./User");

router.get("/admin/users",(req,res)=>{
    res.send("Listagem");
});

router.get("/admin/users/create",(req,res)=>{
    res.render("admin/users/create");
});

module.exports =router;