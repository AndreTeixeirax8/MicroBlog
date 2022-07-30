const express = require("express");
//Necessita dessa variavel visto que vamos chamar rotas apartir daqui alem do inde.js
const router = express.Router();
const Category = require("../categories/Category");

router.get("/articles",(req,res)=>{

res.send("rota Artigos")

});

router.get("/admin/articles/new",(req,res)=>{
    Category.findAll().then(categories =>{//Aqui passamos a lista de categorias para a pagina new(view)
        res.render("admin/articles/new",{categories:categories});
    })
    
});

//Exportar essa variavel para link com o arquivo do index.js
module.exports= router;