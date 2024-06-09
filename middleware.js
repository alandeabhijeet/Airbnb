let Listing = require("./models/listing");
let Review = require("./models/review");
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
};

module.exports.isOwner= async(req,res,next)=>{
    let {id } = req.params;
    let list = await  Listing.findById(id);
    if(!list.owner.equals(res.locals.currUser._id)){
        req.flash("error","Permission denied !");
        return res.redirect(`/listings/${id}`);
    }
    next()
}

module.exports.isAuthor= async(req,res,next)=>{
    let {id,reviewid } = req.params;
    let review = await  Review.findById(reviewid);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","Permission denied !");
        return res.redirect(`/listings/${id}`);
    }
    next();
}