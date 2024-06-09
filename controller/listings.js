let Listing = require("../models/listing");

module.exports.index = async(req,res,next)=>{
    let allListing = await Listing.find({});
    res.render("./listings/index.ejs",{allListing });
}

module.exports.new = (req,res)=>{
    res.render("./listings/new.ejs"); 
}

module.exports.listingById = async(req,res,next)=>{
    let {id} = req.params;
    let list = await Listing.findById(id)
    .populate({
        path: 'reviews',
        populate: {
          path: 'author'
        }
      })
    .populate('owner');
    if(!list){
        req.flash("error" , "Requested listing not exits!");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{list });
}

module.exports.edit = async(req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    if(!list){
        req.flash("error" , "Requested listing not exits!");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs",{list});
}

module.exports.add = async(req,res)=>{
    let {title,description,image,price,location,country} = req.body;
    let list = new Listing({title:title,description:description,image:image,price:price,location:location,country:country});
    list.owner = req.user._id;
    await list.save();
    req.flash("success" , "New Listing added !");
    res.redirect("/listings");
}

module.exports.update = async(req,res)=>{
    let {id } = req.params;
    await  Listing.findByIdAndUpdate(id,{...req.body.list});
    req.flash("success" , "Listing updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.delete = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Deleted !");
    res.redirect("/listings");
}