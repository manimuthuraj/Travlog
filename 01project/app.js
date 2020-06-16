var express = require("express");
var app = express();
var bodyParesr = require("body-parser");
var mongoose = require("mongoose")
var visitedp = require("./models/vmodel")
var passport = require("passport")
var LocalStrategy = require("passport-local")
var User = require("./models/tuser");
var methodOverride = require("method-override")
const { render } = require("ejs");
mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })
app.use(express.static(__dirname + "/public"));
app.use(bodyParesr.urlencoded({ extended: true }));
app.set("view engine", "ejs")
app.use(express.static("public"));

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

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
})
app.use(methodOverride("_method"))


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
    visitedp.find({ $and: [{ place: { $ne: "bucket" } }, { place: { $exists: true } }] }, function(err, vplace) {
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
app.get("/bucket", isLoggedIn, function(req, res) {
    visitedp.find({ $and: [{ place: { $ne: "visited" } }, { place: { $exists: true } }] }, function(err, vplace) {
        if (err) {
            console.log(err)
        } else {
            res.render("vplace", { vplace: vplace })
        }
    })
})

app.get("/visited/new", isLoggedIn, function(req, res) {
    res.render("new.ejs")
})

app.get("/visited/:id/edit", function(req, res) {
    visitedp.findById(req.params.id, function(err, found) {
        if (err) {
            res.redirect("/visited")
        } else {
            res.render("edit", { found: found })
                //res.send("hi")
        }
    })

})
app.put("/visited/:id", function(req, res) {
    visitedp.findByIdAndUpdate(req.params.id, req.body.place, function(err, updated) {
        if (err) {
            res.redirect("/visited")
        } else {
            res.redirect("/visited")
        }
    })
})

app.delete("/visited/:id", function(req, res) {
    visitedp.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/visited")
        } else {
            res.redirect("/visited")
        }
    })
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