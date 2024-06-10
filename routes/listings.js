let express = require("express");
let router = express.Router();

let {listingSchema} = require("../schema.js");
let wrapAsync =require("../utils/wrapAsync.js");
let MyError = require("../utils/MyError.js");
let Listing = require("../models/listing.js");
let {isLoggedIn , isOwner} = require("../middleware.js");

let listingController = require("../controller/listings.js");

let validateListing = (req,res,next)=>{
    let {err} = listingSchema.validate(req.body);
    if(err){
        throw new MyError (403,err);
    }else{
        next();
    }
}

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,validateListing,wrapAsync(listingController.add))

router.get("/try",isLoggedIn,listingController.new);

router.route("/:id")
    .get(wrapAsync(listingController.listingById))
    .put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.update))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.delete))

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.edit))

module.exports = router;