let express = require("express");
let app = express();

let mongoose = require("mongoose");

app.use(express.static("public"));
let methodoveride = require("method-override");
app.use(methodoveride("_method"));

let path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
let ejsMate = require("ejs-mate");
app.engine('ejs', ejsMate);//Like include use but I  thick using this all css also one time

let listings = require("./routes/listings.js");
let reviews = require("./routes/review.js");

let wrapAsync =require("./utils/wrapAsync.js");
let MyError = require("./utils/MyError.js");

let port = 8080;

main().then(()=>{
    console.log("Connected");
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}



app.get("/",wrapAsync(async(req,res)=>{
    let allListing = await Listing.find({});
    res.render("./listings/index.ejs",{allListing });
}));

app.use("/listings",listings);
app.use("/listings/:id/review",reviews);

//not rout
app.all("*",(req,res,next)=>{
    next(new MyError(404,"Rout Not exits"));
})

//Invalid data form hopscoch (server side ) that handle asyn error:
app.use((err,req,res,next)=>{
    let {status=400 , message="Something went Wrong "} = err;
    res.status(status).render("./listings/error.ejs",{message});
});

app.listen(port,()=>{
    console.log("Start");
});