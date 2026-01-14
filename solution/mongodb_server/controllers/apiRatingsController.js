const ratingModel = require('../models/ratings');

/**
 * Get all ratings for a specific anime.
 *
 * @async
 * @function getAnimeRatings
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.anime_id - The ID of the anime to fetch ratings for
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends a JSON array of ratings for the given anime or an error object if failed
 */
async function getAnimeRatings (req, res) {
    try {
        const { anime_id } = req.params; // Anime ID got from the route
        console.log('➡️ getAnimeRatings: request received for anime id:', anime_id);

        const ratings = await ratingModel.find({ anime_id });
        res.status(200).json(ratings);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

/**
 * Get all ratings made by a specific user.
 *
 * @async
 * @function getUserRatings
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.username - The username of the user whose ratings to fetch
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends a JSON array of the user's ratings or an error object if failed
 */
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