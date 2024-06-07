let mongoose = require("mongoose");
let initdata = require("./data.js");
let Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
    await initDb();
} 

let initDb = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner :"665e12a4cfb0fa152849f88b" }));
    await Listing.insertMany(initdata.data);
    console.log("Data Added");
  }
main();
