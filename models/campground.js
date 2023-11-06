const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String,
});

const CampGround = mongoose.model('Campground', CampgroundSchema);

module.exports = CampGround;
