const express = require("express");
//Necessita dessa variavel visto que vamos chamar rotas apartir daqui alem do inde.js
const router = express.Router();

router.get("/categories",(req,res)=>{

res.send("rota categoria")

});

router.get("/admin/categories/new",(req,res)=>{
    res.render("admin/categories/new");
});

//Exportar essa variavel para link com o arquivo do index.js
module.exports= router;