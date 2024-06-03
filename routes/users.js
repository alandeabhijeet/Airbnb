let express = require("express");
let router = express.Router();

let wrapAsync =require("../utils/wrapAsync.js");
let MyError = require("../utils/MyError.js");

let User = require("../models/user.js");

let passport = require("passport");

router.get("/signup",(req,res)=>{
    res.render("./users/signup.ejs");
})

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let{username , email , password} = req.body;
        let newuser = new User({email , username});
        await User.register(newuser , password);
        req.flash("success", "User Registered !");
        res.redirect("/listings");
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}));

router.get("/login",(req,res)=>{
    res.render("./users/login.ejs");
})

router.post("/login",
            passport.authenticate('local', { failureRedirect: '/login' ,failureFlash: true }),
            async(req,res)=>{
                req.flash("success", "Welcome !");
                res.redirect("/listings");
            }
)

module.exports = router;