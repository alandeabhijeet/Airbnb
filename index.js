if (process.env.NODE_ENV != 'production') require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Middleware
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);

// Session and Flash Configuration
const sessionOptions = {
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};
app.use(session(sessionOptions));
app.use(flash());

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Database Connection
const dburl = process.env.ATLAS_URL;
main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Connection error", err);
});

async function main() {
  await mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

// Global Middleware for Flash Messages and Current User
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Routes
const listings = require("./routes/listings.js");
const reviews = require("./routes/review.js");
const users = require("./routes/users.js");
const wrapAsync = require("./utils/wrapAsync.js");
const MyError = require("./utils/MyError.js");

app.get("/", wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("./listings/index.ejs", { allListing });
}));

app.use("/", users);
app.use("/listings", listings);
app.use("/listings/:id/review", reviews);

// Catch-all Route for Undefined Routes
app.all("*", (req, res, next) => {
    next(new MyError(404, "Route Not Exists"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const { status = 400, message = "Something went wrong" } = err;
    res.status(status).render("./listings/error.ejs", { message });
});

// Server Start
const port = 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
