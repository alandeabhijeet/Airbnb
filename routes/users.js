let express = require("express");
let router = express.Router();

let wrapAsync =require("../utils/wrapAsync.js");
let MyError = require("../utils/MyError.js");

let User = require("../models/user.js");

let passport = require("passport");
const { saveUrl, isLoggedIn } = require("../middleware");

router.get("/signup",(req,res)=>{
    res.render("./users/signup.ejs");
})

router.post("/signup",wrapAsync(async(req,res,next)=>{
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
}));

router.get("/login",(req,res)=>{
    res.render("./users/login.ejs");
})

router.post("/login",saveUrl,
            passport.authenticate('local', { failureRedirect: '/login' ,failureFlash: true }),
            async(req,res)=>{
                req.flash("success", "Welcome !");
                const redirectUrl = res.locals.redirectedUrl || '/listings';
                res.redirect(redirectUrl);//But passport.authenticate set session empty so store in local
            }
);

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logout successfully!");
        res.redirect("/listings");
    })
    
})

module.exports = router;