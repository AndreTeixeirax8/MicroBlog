const express = require("express");
//Necessita dessa variavel visto que vamos chamar rotas apartir daqui alem do inde.js
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

//Usar o middlewares adminAuth para ter autenticação nas rotas

router.get("/admin/articles",adminAuth,(req,res)=>{
    Article.findAll({
        //Criando o relacionamento com a tabela categoria
        include:[{model:Category}]
    }).then(articles =>{
        res.render("admin/articles/index",{articles:articles});
    });
});

router.get("/admin/articles/new",adminAuth,(req,res)=>{
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
                res.render("admin/articles/edit",{article: article, categories: categories})
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

router.post("/articles/update",(req,res)=>{
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update({title: title, body:body,categoryId: category, slug:slugify(title)},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/admin/articles");
    }).catch(err =>{
        res.redirect("/");
    });

});

//Processo de paginação
router.get("/articles/page/:num",(req,res)=>{
    var page = req.params.num;
    var offset = 0;

    if(isNaN(page) || page == 1){
        offset=0;
    }else{
        offset=parseInt(page - 1)*4;//converte de texto para valor numerico e multiplica por 4
    }

    /*Pesquisa a quantidade de elementos que tem na tabela 
     e retorna (count) que o total e as rows(Linhas)*/
    Article.findAndCountAll({
        limit:4, //quantidade de artigos que vai retornar da paginação
        offset:offset,
        order:[
            ['id','DESC']//ordenação dos artigos por id
        ],
    }).then(articles =>{

        var next;
        if(offset+4 >= articles.count){
            next=false; //se for maior que a quantidade de registro que tem no banco ele retorna false
        }else{
            next =true;
        }

        var result = {
            page:parseInt(page),//converte a string para um int
            next: next,
            articles : articles
        }
        //passa as categorias para view page.ejs
        Category.findAll().then(categories =>{
            res.render("admin/articles/page",{result:result, categories:categories})
        });
        //devolve uma resposta em JSON para o navegador
        //res.json(result);
    })
});

//Exportar essa variavel para link com o arquivo do index.js
module.exports= router;