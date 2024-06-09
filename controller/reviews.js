let Review = require("../models/review.js");
let Listing = require("../models/listing.js");

module.exports.addReview = async(req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    let newReview = new Review (req.body.review);
    newReview.author = req.user._id;
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    req.flash("success" , "New Review added !");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReview = async(req,res)=>{
    let { id , reviewid} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {reviews :reviewid }});
    await Review.findByIdAndDelete(reviewid);
    req.flash("success" , "Review Deleted !");
    res.redirect(`/listings/${id}`);
}
