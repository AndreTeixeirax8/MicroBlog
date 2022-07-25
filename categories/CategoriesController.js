const express = require("express");
//Necessita dessa variavel visto que vamos chamar rotas apartir daqui alem do inde.js
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories/new",(req,res)=>{
    res.render("admin/categories/new");
});

router.post("/categories/save",(req,res)=>{
    var title = req.body.title;
    if(title != undefined){//verifica se o titulo é um valor valido
        Category.create({
            title:title,
            slug:slugify(title)
        }).then(()=>{
            res.redirect("/");
        })
    }else{
        res.redirect("admin/categories/new");
    }
});

router.get("/admin/categories",(req,res)=>{
    //metodo para trazer as categorias do banco
    Category.findAll().then(categories =>{
        res.render("admin/categories/index",{categories: categories});
    });
    
});

//Exportar essa variavel para link com o arquivo do index.js
module.exports= router;