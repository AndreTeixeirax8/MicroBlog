const express = require("express");
const app =express();

app.get("/",(req,res)=>{
    res.send("Bemvindo ao microblog")
})

app.listen(4000,() => {
    console.log("O servidor está rodando na porta 4000")
})