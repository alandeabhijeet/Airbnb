let User = require("../models/user.js");

module.exports.signUpget = (req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.signUpPost = async(req,res,next)=>{
    try{
        let{username , email , password} = req.body;
        let newuser = new User({email , username});
        registerUser = await User.register(newuser , password);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "User Registered !");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.loginget = (req,res)=>{
    res.render("./users/login.ejs");
}

module.exports.loginPost = async(req,res)=>{
    req.flash("success", "Welcome !");
    const redirectUrl = res.locals.redirectedUrl || '/listings';
    res.redirect(redirectUrl);//But passport.authenticate set session empty so store in local
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logout successfully!");
        res.redirect("/listings");
    })
    
}