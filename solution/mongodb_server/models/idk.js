const mongoose = require('mongoose');
//TODO change to anime
const weatherSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    // A list of forecasts (today + future) -- note how to declare an array!!
    forecasts: [
        {
            date: { type: Date, required: true },
            forecast: { type: String, required: true }
        }
    ],

    // Explicit timestamp for caching and freshness checks
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model
module.exports = mongoose.model('Weather', weatherSchema);

/*ANOTHER MODEL
const mongoose = require('mongoose');
const Character
    = new mongoose.Schema( {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        dob: {type: Number, required: true, max: new Date().getFullYear()},
    }
);
// exporting the model
module.exports = mongoose.model('Character', Character);
 */