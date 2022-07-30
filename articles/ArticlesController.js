const express = require("express");
//Necessita dessa variavel visto que vamos chamar rotas apartir daqui alem do inde.js
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles",(req,res)=>{
    Article.findAll().then(articles =>{
        res.render("admin/articles/index",{articles:articles});
    });
});

router.get("/admin/articles/new",(req,res)=>{
    Category.findAll().then(categories =>{//Aqui passamos a lista de categorias para a pagina new(view)
        res.render("admin/articles/new",{categories:categories});
    })
    
});

router.post("/articles/save",(req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title:title,
        slug:slugify(title),
        body:body,
        //esse campo é criado do relacionamento entre tabelas seria a chave estrangeira
        categoryId:category 
    }).then(()=>{
        res.redirect("/admin/articles");
    });
});

//Exportar essa variavel para link com o arquivo do index.js
module.exports= router;