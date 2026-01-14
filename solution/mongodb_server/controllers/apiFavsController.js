const favModel = require("../models/favs");

/**
 * Get all favorite entries, optionally filtered by type or ID.
 *
 * @async
 * @function getAllFavs
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} [req.query.fav_type] - Optional type of favorite (e.g., anime, character, person)
 * @param {number} [req.query.id] - Optional MyAnimeList ID of the favorited entity
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends a JSON array of favorite entries, or an error object if failed
 */
async function getAllFavs(req, res) {
    try {
        const filter = {};
        if (req.query.fav_type) filter.fav_type = req.query.fav_type;
        if (req.query.id) filter.id = Number(req.query.id);

        const favs = await favModel.find(filter).limit(100);
        res.json(favs);
    } catch (err) {
        console.error("Mongo GET /getAllFavs failed:", err.message);
        res.status(500).json({ error: "MongoDB error" });
    }
}

/**
 * Get all favorites of a specific user.
 *
 * @async
 * @function getFavsByUser
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.username - Username whose favorites should be retrieved
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends a JSON array of the user's favorite entries, or an error object if failed
 */
async function getFavsByUser(req, res) {
    try {
        const { username } = req.params;
        const favs = await favModel.find({ username });
        res.json(favs);
    } catch (err) {
        console.error("Mongo GET /favs/user failed:", err.message);
        res.status(500).json({ error: "MongoDB error" });
    }
}

module.exports = {getAllFavs, getFavsByUser};
