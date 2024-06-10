let express = require("express");
let router = express.Router();

let wrapAsync =require("../utils/wrapAsync.js");
let MyError = require("../utils/MyError.js");
let userController = require("../controller/users.js");
let passport = require("passport");
let { saveUrl, isLoggedIn } = require("../middleware");

router.route("/signup")
    .get(userController.signUpget)
    .post(wrapAsync(userController.signUpPost));

router.route("/login")
    .get(userController.loginget)
    .post(saveUrl,
        passport.authenticate('local', { failureRedirect: '/login' ,failureFlash: true }),
        userController.loginPost
    );

router.get("/logout",userController.logout)

module.exports = router;