let express = require("express");
let router = express.Router({mergeParams : true});

let {listingSchema , reviewSchema} = require("../schema.js");
let wrapAsync =require("../utils/wrapAsync.js");
let MyError = require("../utils/MyError.js");
let Review = require("../models/review.js");
let Listing = require("../models/listing.js");

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
router.post("/",validateReview,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    let newReview = new Review (req.body.review);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    res.redirect(`/listings/${id}`);
}))

//Delete Review 
router.delete("/:reviewid",wrapAsync(async(req,res)=>{
    let { id , reviewid} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {reviews :reviewid }});
    await Review.findByIdAndDelete(reviewid);
    res.redirect(`/listings/${id}`);
}));
module.exports = router;