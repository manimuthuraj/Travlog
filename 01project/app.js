var express = require("express");
var app = express();
var bodyParesr = require("body-parser");
var mongoose = require("mongoose")
var visitedp = require("./models/vmodel")
var passport = require("passport")
var LocalStrategy = require("passport-local")
var User = require("./models/tuser");
var methodOverride = require("method-override")
var visitedRoutes = require("./routes/vroute")
var indexRoutes = require("./routes/index")
var flash = require("connect-flash")
const { render } = require("ejs");
mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })
app.use(express.static(__dirname + "/public"));
app.use(bodyParesr.urlencoded({ extended: true }));
app.set("view engine", "ejs")
app.use(flash())
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
app.use(visitedRoutes);
app.use(indexRoutes);



app.listen(3000, function() {
    console.log("Started")
})