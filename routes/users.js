let express = require("express");
let router = express.Router();

let wrapAsync =require("../utils/wrapAsync.js");
let MyError = require("../utils/MyError.js");

let userController = require("../controller/users.js");

let passport = require("passport");
const { saveUrl, isLoggedIn } = require("../middleware");

router.get("/signup",userController.signUpget)

router.post("/signup",wrapAsync(userController.signUpPost));

router.get("/login",userController.loginget)

router.post("/login",saveUrl,
    passport.authenticate('local', { failureRedirect: '/login' ,failureFlash: true }),
    userController.loginPost
);

router.get("/logout",userController.logout)

module.exports = router;