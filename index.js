/*Dependencias do projeto
Link para baixar o TinyMCE = https://www.tiny.cloud/get-tiny/self-hosted/
Link para tradução = https://www.tiny.cloud/get-tiny/language-packages/
*/
const express = require("express");
const app =express();
const bodyParser = require("body-parser");
const session = require ("express-session");
const connection = require("./database/database");
//Importa or arquivo de rota do categories
const categoriesController=require("./categories/CategoriesController");
const articlesController =require("./articles/ArticlesController");
const usersController =require("./users/UsersController");

const Article = require("./articles/Article");
const Category =require("./categories/Category");
const User =  require("./users/User");


//View engine (Motor de redenrização de html)
app.set('view engine','ejs');

//Sessions
//300000000 milesegundos = 3,4 dias
//3000000      ||       = 50  minutos 
app.use(session({
    secret:"palavra_aleatoria",
    cookie:{maxAge:3000000 }//tempo de expiração do cookie valor em milessegundos aqui equivale a 50 minutos
}));

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

//Rota home
app.get("/",(req,res)=>{
    Article.findAll({
        order:[
            ['id','DESC']//ordenação dos artigos na home
        ],
        limit:4 //limita em mostrar os 4 ultimos artigos na home
    }).then(articles =>{
        Category.findAll().then(categories =>{
             //Pesquisa os artigos para home
        res.render("index",{articles:articles,categories:categories}); 
        });
       
    });
    
});

/*Aqui diz para aplicação onde estão as rotas do CategoriesController
Tambem é um prefixo de tudo que vai antes do barra categories*/
app.use("/",categoriesController);
app.use("/",articlesController);
app.use("/",usersController);

/*rota de seção testes
app.get("/session",(req,res)=>{
    req.session.treinamento="Formação nodeJS"
    req.session.ano = 2019
    res.send("Seção gerada");
});
app.get("/leitura",(req,res) =>{
    res.json({
        treinamento:req.session.treinamento,
        ano:req.session.ano 
    })
});
*/


app.get("/:slug",(req,res)=>{
    //rota de busca por slug
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article =>{
        if(article != undefined){//se localiza o slug passa pra view o artigo 
            Category.findAll().then(categories =>{
                //Pesquisa os artigos para home
           res.render("article",{article:article,categories:categories}); 
           });
        }else{
            res.redirect("/");
        }
    }).catch(err =>{
        res.redirect("/");
    });
});

app.get("/category/:slug",(req,res)=>{
    var slug =req.params.slug;
    Category.findOne({
        where:{
            slug:slug
        },
        //Aqui incluimos o Article parta fazer o JOIN na busca
        include: [{model:Article}]
    }).then(category =>{
        if(category != undefined){
            //aqui vamos re ultilizar a index.ejs geral
            Category.findAll().then(categories =>{
                res.render("index",{articles: category.articles, categories: categories});
            });

        }else{
            //se for vazio volta para rota pricipal
            res.redirect("/");
        }
    }).catch(err =>{
        //se der erro  volta para rota pricipal
        res.redirect("/");
    })
});

app.listen(4000,() => {
    console.log("O servidor está rodando na porta 4000");
})