const axios = require("axios");

const mongoApi = axios.create({
    baseURL: "http://localhost:3001", // Mongo satellite port
});

/**
 * Retrieves recommendations for a specific anime.
 *
 * This controller function acts as a gateway endpoint on the main server.
 * It forwards the request to the MongoDB satellite server, which stores
 * and manages user-submitted recommendations.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Route parameters.
 * @param {string} req.params.mal_id - MyAnimeList ID of the anime.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response containing recommendations for the specified anime.
 */
async function getRecommendationsAnime(req, res) {
    console.log("GET /api/recommendations/:mal_id", req.params);
    try {
        const { mal_id } = req.params;
        const response = await mongoApi.get(`/recommendations/${mal_id}`);
        res.json(response.data);
    } catch (err) {
        console.error("Mongo GET /recommendations/:mal_id failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

module.exports = { getRecommendationsAnime };
