let express = require("express");
let router = express.Router();

let {listingSchema , reviewSchema} = require("../schema.js");
let wrapAsync =require("../utils/wrapAsync.js");
let MyError = require("../utils/MyError.js");
let Listing = require("../models/listing.js");

let {isLoggedIn , isOwner} = require("../middleware.js");

let validateListing = (req,res,next)=>{
    let {err} = listingSchema.validate(req.body);
    if(err){
        throw new MyError (403,err);
    }else{
        next();
    }
}

router.get("/",wrapAsync(async(req,res,next)=>{
    let allListing = await Listing.find({});
    res.render("./listings/index.ejs",{allListing });
}))

router.get("/try",isLoggedIn,(req,res)=>{
    res.render("./listings/new.ejs"); 
});

router.get("/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    let list = await Listing.findById(id).populate("reviews").populate("owner");
    if(!list){
        req.flash("error" , "Requested listing not exits!");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{list });
}));

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    if(!list){
        req.flash("error" , "Requested listing not exits!");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs",{list});
}))

router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res)=>{
    let {title,description,image,price,location,country} = req.body;
    let list = new Listing({title:title,description:description,image:image,price:price,location:location,country:country});
    list.owner = req.user._id;
    await list.save();
    req.flash("success" , "New Listing added !");
    res.redirect("/listings");
}))

router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async(req,res)=>{
    let {id } = req.params;
    await  Listing.findByIdAndUpdate(id,{...req.body.list});
    req.flash("success" , "Listing updated!");
    res.redirect(`/listings/${id}`);
}));

router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Deleted !");
    res.redirect("/listings");
}));


module.exports = router;