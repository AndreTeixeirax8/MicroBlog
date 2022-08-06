const express = require("express");
//Necessita dessa variavel visto que vamos chamar rotas apartir daqui alem do inde.js
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");
//Requisição do Middlewares de  seguração
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/categories/new",adminAuth,(req,res)=>{
    res.render("admin/categories/new");
});

router.post("/categories/save",(req,res)=>{
    var title = req.body.title;
    if(title != undefined){//verifica se o titulo é um valor valido
        Category.create({
            title:title,
            slug:slugify(title)
        }).then(()=>{
            res.redirect("/admin/categories");
        })
    }else{
        res.redirect("admin/categories/new");
    }
});

router.get("/admin/categories",adminAuth,(req,res)=>{
    //metodo para trazer as categorias do banco
    Category.findAll().then(categories =>{
        res.render("admin/categories/index",{categories: categories});
    });
});

router.post("/categories/delete",(req,res)=>{
    var id =req.body.id;
    if(id != undefined){
        if(!isNaN(id)){//verifica se o id não é numerico ou não
            Category.destroy({
                where:{//compara se é igual a variavel id
                    id:id 
                }
            }).then(()=>{
                res.redirect("/admin/categories");
            })  
        }else{
            res.redirect("/admin/categories");
        }
    }else{ //se for nulo
        res.redirect("/admin/categories");
    }
});

router.get("/admin/categories/edit/:id",adminAuth,(req,res)=>{
    var id = req.params.id;
    if(isNaN(id)){//se ele não for um numero então redireciona
        res.redirect("/admin/categories");
    }
    Category.findByPk(id).then(category =>{
        if(category != undefined){

            res.render("admin/categories/edit",{category:category});

        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro =>{
        res.redirect("/admin/categories");
    });
});

router.post("/categories/update",(req,res)=>{
    var id = req.body.id;
    var title = req.body.title;

    Category.update({
        title:title,slug:slugify(title)},
        {where:{id:id}
    }).then(()=>{
        res.redirect("/admin/categories");
    });
});

//Exportar essa variavel para link com o arquivo do index.js
module.exports= router;