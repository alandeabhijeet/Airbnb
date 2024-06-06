module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must Logged In !");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectedUrl=req.session.redirectUrl;
    }
    next();
}