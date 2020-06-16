var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var tuserScheme = new mongoose.Schema({
    username: String,
    password: String,
})

tuserScheme.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", tuserScheme)