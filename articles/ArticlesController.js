const express = require("express");
//Necessita dessa variavel visto que vamos chamar rotas apartir daqui alem do inde.js
const router = express.Router();

router.get("/articles",(req,res)=>{

res.send("rota Artigos")

});

router.get("/admin/articles/new",(req,res)=>{

});

//Exportar essa variavel para link com o arquivo do index.js
module.exports= router;