const mongoose = require("mongoose");

const FavsSchema = new mongoose.Schema({
        id: {type: Number, required: true},
        username: {type: String, required: true},
        favs_type: {type: String, required: true},
});

module.exports = mongoose.model('Favs', FavsSchema, 'favs');
