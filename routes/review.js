let express = require("express");
let router = express.Router({mergeParams : true});

let {listingSchema , reviewSchema} = require("../schema.js");
let wrapAsync =require("../utils/wrapAsync.js");
let MyError = require("../utils/MyError.js");
let Review = require("../models/review.js");
let Listing = require("../models/listing.js");

let {isLoggedIn ,isAuthor} = require("../middleware");

let validateReview = (req,res,next)=>{
    let {err} = reviewSchema.validate(req.body);
    if(err){
        throw new MyError(400,err);
    }else{
        next();
    }
}

//Reviews
//post
router.post("/",isLoggedIn,validateReview,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    let newReview = new Review (req.body.review);
    newReview.author = req.user._id;
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    req.flash("success" , "New Review added !");
    res.redirect(`/listings/${id}`);
}))

//Delete Review 
router.delete("/:reviewid",isLoggedIn,isAuthor,wrapAsync(async(req,res)=>{
    let { id , reviewid} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {reviews :reviewid }});
    await Review.findByIdAndDelete(reviewid);
    req.flash("success" , "Review Deleted !");
    res.redirect(`/listings/${id}`);
}));
module.exports = router;