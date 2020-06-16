var express = require("express");
var app = express();
var bodyParesr = require("body-parser");
var mongoose = require("mongoose")
var visitedp = require("./models/vmodel")
var passport = require("passport")
var LocalStrategy = require("passport-local")
var User = require("./models/tuser");
const { render } = require("ejs");
mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })
app.use(bodyParesr.urlencoded({ extended: true }));
app.set("view engine", "ejs")

app.use(require("express-session")({
    secret: "hi travelog",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

/*var visitedpSchema = new mongoose.Schema({
    name: String,
    image: String,
    about: String
})
var visitedp = mongoose.model("visitedp", visitedpSchema);
/*visitedp.create({
    name: "paris",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    about: "Beautiful  page"
}, function(err, visited) {
    if (err) {
        console.log(err)
    } else {
        console.log("visited")
    }
})*/
app.get("/", function(req, res) {
    res.render("Login")
})
app.get("/visited", isLoggedIn, function(req, res) {
    visitedp.find({}, function(err, vplace) {
        if (err) {
            console.log(err)
        } else {
            res.render("vplace", { vplace: vplace })
        }
    })
})

app.post("/visited", isLoggedIn, function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var about = req.body.about
    var newPlace = { name: name, image: image, about: about }
    visitedp.create(newPlace, function(err, visited) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/visited")
        }
    })
})
app.get("/bucket", function(req, res) {
    visitedp.find({}, function(err, vplace) {
        if (err) {
            console.log(err)
        } else {
            res.render("bucket", { vplace: vplace })
        }
    })
})

app.get("/visited/new", isLoggedIn, function(req, res) {
    res.render("new.ejs")
})

app.get("/register", function(req, res) {
    res.render("Login")
})

app.post("/register", function(req, res) {
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

app.get("/login", function(reqq, res) {
    res.render("Login")
})

app.post("/login", passport.authenticate("local", { successRedirect: "/visited", failureRedirect: "/" }),
    function(reqq, res) {
        res.render("Login")
    })

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/")
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/")
}

app.listen(3000, function() {
    console.log("Started")
})