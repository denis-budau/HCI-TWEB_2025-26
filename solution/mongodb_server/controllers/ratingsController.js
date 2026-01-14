const ratingModel = require('../models/ratings');

// Method to communicate with the database for ratings of a specific anime
async function getAnimeRatings (req, res) {
    try {
        const { anime_id } = req.params; // Anime ID got from the route
        console.log('➡️ getAnimeRatings: request received for anime id:', anime_id);

        const ratings = await ratingModel.find({ anime_id });

        console.log(`✅ Found ${ratings.length} rating`);
        res.status(200).json(ratings);

    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Method to communicate with the database for a specific user's ratings
async function getUserRatings (req, res) {
    console.log('🟡 getUserRatings START');
    try {
        const { username } = req.params;
        console.log('➡️ getUserRatings: request received for username:', username);

        const ratings = await ratingModel.find({ username });

        res.status(200).json(ratings);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {getAnimeRatings, getUserRatings};