// Dependencias do projeto
const express = require("express");
const app =express();
const bodyParser = require("body-parser");

//View engine (Motor de redenrização de html)
app.set('view engine','ejs');

//Arquivos staticos
app.use(express.static('public'));

//Ultilizar body parser para aceitar dados de formulario
app.use(bodyParser.urlencoded({extends:false}));
//Ultilizar body parser para aceitar dados json
app.use(bodyParser.json());



app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(4000,() => {
    console.log("O servidor está rodando na porta 4000");
})