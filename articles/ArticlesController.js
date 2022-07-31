const express = require("express");
//Necessita dessa variavel visto que vamos chamar rotas apartir daqui alem do inde.js
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles",(req,res)=>{
    Article.findAll({
        //Criando o relacionamento com a tabela categoria
        include:[{model:Category}]
    }).then(articles =>{
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

router.post("/articles/delete",(req,res)=>{
    var id =req.body.id;
    if(id != undefined){
        if(!isNaN(id)){//verifica se o id não é numerico ou não
           Article.destroy({
                where:{//compara se é igual a variavel id
                    id:id 
                }
            }).then(()=>{
                res.redirect("/admin/articles");
            })  
        }else{
            res.redirect("/admin/articles");
        }
    }else{ //se for nulo
        res.redirect("/admin/articles");
    }
});

router.get("/admin/articles/edit/:id", (req,res)=>{
//recebe o id do artigo que vem na rota 
var id = req.params.id;
    //pesquisa um artigo pelo id 
    Article.findByPk(id).then(article =>{
        if(article != undefined){
            //lista de categorias do sistema
            Category.findAll().then(categories=>{
                res.render("admin/articles/edit",{categories:categories})
            });

        }else{
        //se houver algum erro ele redireciona para home
        res.redirect("/");
        }
    }).catch(err =>{
        //se houver algum erro ele redireciona para home
        res.redirect("/");
    });
});

//Exportar essa variavel para link com o arquivo do index.js
module.exports= router;