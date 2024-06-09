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

router.get("/",wrapAsync(listingController.index));

router.get("/try",isLoggedIn,listingController.new);

router.get("/:id",wrapAsync(listingController.listingById));

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.edit))

router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.add))

router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.update));

router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.delete));


module.exports = router;