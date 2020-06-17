var express = require("express")
var router = express.Router()
var visitedp = require("../models/vmodel")
var User = require("../models/vmodel")

router.get("/", function(req, res) {
    res.render("Login")
})

router.get("/visited", isLoggedIn, function(req, res) {
    /*visitedp.find({ $and: [{ place: { $ne: "bucket" } }, { place: { $exists: true } }] }, function(err, vplace) {
        if (err) {
            console.log(err)
        } else {
            res.render("vplace", { vplace: vplace })
        }
    })*/
    userid = req.user._id
    query = { $and: [{ place: { $ne: "bucket" } }, { place: { $exists: true } }] }
    final = { $and: [{ "user": userid }, query] }
    visitedp.find({ "user": userid }, function(err, place) {
        if (err) { console.log(err) } else {
            visitedp.find(final, function(err, vplace) {
                if (err) {
                    console.log(err)
                } else {
                    res.render("vplace", { vplace: vplace })
                }
            })
        }
    })

})

router.post("/visited", isLoggedIn, function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var about = req.body.about
    var place = req.body.place
    var date = req.body.date
    var user = req.user._id
    var newPlace = { name: name, image: image, about: about, place: place, date: date, user: user }
    visitedp.create(newPlace, function(err, visited) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/visited")
        }
    })
})
router.get("/bucket", isLoggedIn, function(req, res) {
    /*visitedp.find({ $and: [{ place: { $ne: "visited" } }, { place: { $exists: true } }] }, function(err, vplace) {
        if (err) {
            console.log(err)
        } else {
            res.render("bucket", { vplace: vplace })
        }
    })*/
    userid = req.user._id
    query = { $and: [{ place: { $ne: "visited" } }, { place: { $exists: true } }] }
    final = { $and: [{ "user": userid }, query] }
    visitedp.find({ "user": userid }, function(err, place) {
        if (err) { console.log(err) } else {
            visitedp.find(final, function(err, vplace) {
                if (err) {
                    console.log(err)
                } else {
                    res.render("bucket", { vplace: vplace })
                }
            })
        }
    })
})

router.get("/visited/new", isLoggedIn, function(req, res) {
    res.render("new.ejs")
})

router.get("/visited/:id/edit", function(req, res) {
    visitedp.findById(req.params.id, function(err, found) {
        if (err) {
            res.redirect("/visited")
        } else {
            res.render("edit", { found: found })
        }
    })

})
router.put("/visited/:id", function(req, res) {
    visitedp.findByIdAndUpdate(req.params.id, req.body.place, function(err, updated) {
        if (err) {
            res.redirect("/visited")
        } else {
            res.redirect("/visited")
        }
    })
})

router.delete("/visited/:id", function(req, res) {
    visitedp.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/visited")
        } else {
            res.redirect("/visited")
        }
    })
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/")
}


module.exports = router