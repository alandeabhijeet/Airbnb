let mongoose = require("mongoose");

main().then(() => {
    console.log("Connected");
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

let Schema = mongoose.Schema;

let listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default : "https://unsplash.com/photos/brown-wooden-lounge-chairs-on-brown-wooden-dock-during-daytime-xEaAoizNFV8",
        set: (v) => v === "" ? "https://unsplash.com/photos/brown-wooden-lounge-chairs-on-brown-wooden-dock-during-daytime-xEaAoizNFV8" : v
    },
    price: Number,
    location: String,
    country: String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        },
    ]
});

let Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
