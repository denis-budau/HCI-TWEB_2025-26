const axios = require("axios");

const mongo = axios.create({
    baseURL: "http://localhost:3001", // Mongo satellite port
    timeout: 5000,
});

/**
 * Retrieves all ratings associated with a specific anime.
 *
 * This controller function forwards the request to the MongoDB satellite server,
 * which stores and manages dynamic user-generated data (ratings).
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Route parameters.
 * @param {string} req.params.anime_id - Unique identifier of the anime.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response containing all ratings for the given anime.
 */
async function getAnimeRatings(req, res) {
    console.log("GET /anime/:anime_id/ratings", req.query);
    try {
        const { anime_id } = req.params;
        const response = await mongo.get(`/ratings/anime/${anime_id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

/**
 * Retrieves all ratings submitted by a specific user.
 *
 * This function acts as a gateway between the client and the MongoDB satellite
 * server, forwarding the request and returning the user's ratings as JSON.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Route parameters.
 * @param {string} req.params.username - Username of the user.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response containing all ratings submitted by the user.
 */
async function getUserRatings(req, res) {
    console.log("GET /userProfile/:user_id/ratings", req.query);
    try {
        const { username } = req.params;
        const response = await mongo.get(`/ratings/user/${username}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {getAnimeRatings, getUserRatings};
