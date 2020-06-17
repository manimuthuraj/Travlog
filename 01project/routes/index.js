var express = require("express");
var router = express.Router();
var passport = require("passport")
var User = require("../models/tuser")



router.get("/register", function(req, res) {
    res.render("Login")
})

router.post("/register", function(req, res) {
    var newtuser = new User({ username: req.body.username })
    User.register(newtuser, req.body.password, function(err, user) {
        if (err) {
            console.log(err)
            return res.render("Login")
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/visited")
        })
    })
})

router.get("/login", function(req, res) {
    res.render("Login", { message: "errr" })
})

router.post("/login", passport.authenticate("local", { successRedirect: "/visited", failureRedirect: "/", failureFlash: true, failureMessage: true }),
    function(req, res) {
        res.render("Login")
    })

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/")
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/")
}

module.exports = router;