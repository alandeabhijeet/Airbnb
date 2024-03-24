const { date } = require("joi");
let mongoose = require("mongoose");

main().then(() => {
    console.log("Connected");
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

let Schema = mongoose.Schema;

let reviewSchema = new Schema({
    comment : String,
    rating : {
        type :Number,
        min : 1,
        max : 5
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("Review",reviewSchema);