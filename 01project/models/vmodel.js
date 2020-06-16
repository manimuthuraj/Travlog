var mongoose = require("mongoose")
mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })

var visitedpSchema = new mongoose.Schema({
    name: String,
    image: String,
    about: String,
    place: String,
    date: { type: Date }
})
module.exports = mongoose.model("visitedp", visitedpSchema);