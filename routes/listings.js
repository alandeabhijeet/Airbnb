let express = require("express");
let router = express.Router();

let {listingSchema , reviewSchema} = require("../schema.js");
let wrapAsync =require("../utils/wrapAsync.js");
let MyError = require("../utils/MyError.js");
let Listing = require("../models/listing.js");

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

router.get("/try",(req,res)=>{
    res.render("./listings/new.ejs"); 
});

router.get("/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    let list = await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs",{list });
}));

router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    res.render("./listings/edit.ejs",{list});
}))

router.post("/",validateListing,wrapAsync(async(req,res)=>{
    let {title,description,image,price,location,country} = req.body;
    let list = new Listing({title:title,description:description,image:image,price:price,location:location,country:country});
    await list.save();
    res.redirect("/listings");
}))

router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
    let {id } = req.params;
    await  Listing.findByIdAndUpdate(id,{...req.body.list});
    res.redirect(`/listings/${id}`);
}));

router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));


module.exports = router;