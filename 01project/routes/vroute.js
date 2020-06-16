/*var express = require("express")
var router = express.Router();
var User = require("../models/tuser");
mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })



router.get("/", function(req, res) {
    res.render("Login")
})

router.get("/visited", isLoggedIn, function(req, res) {
    visitedp.find({ $and: [{ place: { $ne: "bucket" } }, { place: { $exists: true } }] }, function(err, vplace) {
        if (err) {
            console.log(err)
        } else {
            res.render("vplace", { vplace: vplace })
        }
    })
})

router.post("/visited", isLoggedIn, function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var about = req.body.about
    var place = req.body.place
    var date = req.body.date
    var newPlace = { name: name, image: image, about: about, place: place, date: date }
    visitedp.create(newPlace, function(err, visited) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/visited")
        }
    })
})
router.get("/bucket", function(req, res) {
    visitedp.find({ $and: [{ place: { $ne: "visited" } }, { place: { $exists: true } }] }, function(err, vplace) {
        if (err) {
            console.log(err)
        } else {
            res.render("vplace", { vplace: vplace })
        }
    })
})

router.get("/visited/new", isLoggedIn, function(req, res) {
    res.render("new.ejs")
})

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

router.get("/login", function(reqq, res) {
    res.render("Login")
})

router.post("/login", passport.authenticate("local", { successRedirect: "/visited", failureRedirect: "/" }),
    function(reqq, res) {
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

module.exports = router;*/