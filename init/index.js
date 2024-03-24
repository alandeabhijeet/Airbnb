let mongoose = require("mongoose");
let initdata = require("./data.js");
let Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
    await initDb();
} 

let initDb = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Data Added");
  }
main();
