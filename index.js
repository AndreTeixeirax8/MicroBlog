/*Dependencias do projeto
Link para baixar o TinyMCE = https://www.tiny.cloud/get-tiny/self-hosted/
Link para tradução = https://www.tiny.cloud/get-tiny/language-packages/
*/
const express = require("express");
const app =express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
//Importa or arquivo de rota do categories
const categoriesController=require("./categories/CategoriesController");
const articlesController =require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category =require("./categories/Category");

//View engine (Motor de redenrização de html)
app.set('view engine','ejs');

//Arquivos staticos
app.use(express.static('public'));

//Ultilizar body parser para aceitar dados de formulario
app.use(bodyParser.urlencoded({extended:false}));
//Ultilizar body parser para aceitar dados json
app.use(bodyParser.json());

//Conexão com o banco de dados
connection
        .authenticate()
        .then(()=>{
            console.log("Conexão com banco de dados efetuada com sucesso");
        }).catch((error)=>{
            console.log(error);
        })


app.get("/",(req,res)=>{
    Article.findAll().then(articles =>{
        //Pesquisa os artighos para home
        res.render("index",{articles:articles}); 
    });
    
});

/*Aqui diz para aplicação onde estão as rotas do CategoriesController
Tambem é um prefixo de tudo que vai antes do barra categories*/
app.use("/",categoriesController);
app.use("/",articlesController);


app.get("/:slug",(req,res)=>{
    //rota de busca por slug
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article =>{
        if(article != undefined){//se localiza o slug passa pra view o artigo 
            res.render("article",{article:article});
        }else{
            res.redirect("/");
        }
    }).catch(err =>{
        res.redirect("/");
    });
});

app.listen(4000,() => {
    console.log("O servidor está rodando na porta 4000");
})