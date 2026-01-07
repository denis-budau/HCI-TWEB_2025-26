const mongoose = require('mongoose');

const RatingsSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    username: { type: String, required: true },
    anime_id: { type: Number, required: true },
    status: { type: String, required: true },
    score: { type: Number, required: true },
    is_rewatching: { type: Number, required: true },
    num_watched_episodes: { type: Number, required: true },
    total_episodes: { type: Number, required: true },
});

module.exports = mongoose.model('Ratings', RatingsSchema, 'ratings');