const Recommendation = require("../models/Recommendations");

/**
 * Get recommendations for a specific anime by its MyAnimeList ID.
 *
 * @async
 * @function getRecommendationsAnime
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {number} req.params.mal_id - MyAnimeList ID of the anime
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends a JSON array of recommendations for the given anime or an error object if failed
 */
async function getRecommendationsAnime(req, res) {
    try {
        const mal_id = Number(req.params.mal_id);
        const rows = await Recommendation.find({ mal_id }).limit(200);
        res.json(rows);
    } catch (err) {
        console.error("Mongo GET /recommendations/of/:mal_id failed:", err.message);
        res.status(500).json({ error: "MongoDB error" });
    }
}

module.exports = {getRecommendationsAnime};
