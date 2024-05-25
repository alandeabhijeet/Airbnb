let express = require("express");
let app = express();

let mongoose = require("mongoose");
let {listingSchema} = require("./schema.js");

app.use(express.static("public"));
let methodoveride = require("method-override");
app.use(methodoveride("_method"));

let Listing = require("./models/listing.js");
let path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

let ejsMate = require("ejs-mate");
app.engine('ejs', ejsMate);//Like include use but I  thick using this all css also one time
let Review = require("./models/review.js");

let port = 8080;

app.listen(port,()=>{
    console.log("Start");
});
main().then(()=>{
    console.log("Connected");
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

let wrapAsync =require("./utils/wrapAsync.js");
let MyError = require("./utils/MyError.js");

app.get("/",wrapAsync(async(req,res)=>{
    let allListing = await Listing.find({});
    res.render("./listings/index.ejs",{allListing });
}));



app.get("/listings",wrapAsync(async(req,res,next)=>{
    let allListing = await Listing.find({});
    
    res.render("./listings/index.ejs",{allListing });
}))

app.get("/listings/try",(req,res)=>{
    res.render("./listings/new.ejs"); 
});

app.get("/listings/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    let list = await Listing.findById(id).populate("reviews");
    console.log(list);
    res.render("./listings/show.ejs",{list });
}));


app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    res.render("./listings/edit.ejs",{list});
}))

let validateListing = (req,res,next)=>{
    let {err} = listingSchema.validate(req.body);
    if(err){
        throw new MyError (403,err);
    }else{
        next();
    }
}

app.post("/listings",validateListing,wrapAsync(async(req,res)=>{

    let {title,description,image,price,location,country} = req.body;
    let list = new Listing({title:title,description:description,image:image,price:price,location:location,country:country});
    await list.save();
    res.redirect("/listings");
}))

app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
    let {id } = req.params;
    await  Listing.findByIdAndUpdate(id,{...req.body.list});
    res.redirect(`/listings/${id}`);
}));

app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));


//Reviews
//post
app.post("/listings/:id/review",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    let newReview = new Review (req.body.review);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    console.log("New review saved");
    res.redirect(`/listings/${id}`);
}))













//not rout
app.all("*",(req,res,next)=>{
    next(new MyError(404,"Rout Not exits"));
})

//Invalid data form hopscoch (server side ) that handle asyn error:
app.use((err,req,res,next)=>{
    let {status=400 , message="Something went Wrong "} = err;
    res.status(status).render("./listings/error.ejs",{message});
});


