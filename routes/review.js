let express = require("express");
let router = express.Router({mergeParams : true});

let {listingSchema , reviewSchema} = require("../schema.js");
let wrapAsync =require("../utils/wrapAsync.js");
let MyError = require("../utils/MyError.js");
let Review = require("../models/review.js");
let Listing = require("../models/listing.js");

let {isLoggedIn ,isAuthor} = require("../middleware");
const reviewController = require("../controller/reviews.js");

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
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.addReview))

//Delete Review 
router.delete("/:reviewid",isLoggedIn,isAuthor,wrapAsync(reviewController.deleteReview));
module.exports = router;