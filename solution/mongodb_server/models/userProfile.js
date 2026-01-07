const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
    username: { type: String, required: true },
    location: { type: String, required: true },
    joined: { type: Date, required: true },
    watching: { type: Number, required: true },
    completed: { type: Number, required: true },
    on_hold: { type: Number, required: true },
    dropped: { type: Number, required: true },
    plan_to_watch: { type: Number, required: true },
});

module.exports = mongoose.model('UserProfile', UserProfileSchema, 'user_profile');