function adminAuth(req,res,next){
    //Se a seção foi criada então autoriza acessar 
    if(req.session.user != undefined){
        next();
    }else{
        res.redirect("/login");
    }
}

module.exports =adminAuth