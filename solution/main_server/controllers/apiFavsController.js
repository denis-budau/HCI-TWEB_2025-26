const axios = require("axios");

const mongo = axios.create({
    baseURL: "http://localhost:3001", // Mongo satellite port
});

/**
 * Retrieves all favorite entries.
 *
 * This controller function acts as a gateway endpoint on the main server.
 * It forwards the request to the MongoDB Express satellite server, which
 * performs the actual data retrieval from the NoSQL database.
 *
 * This endpoint is currently not used by the main application and is
 * kept for completeness.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response containing all favorite entries.
 */
async function getAllFavs(req, res) {
    console.log("GET /api/favs/getAllFavs", req.params);
    try {
        const response = await mongo.get("api/favs/getAllFavs");
        res.json(response.data);
    } catch (err) {
        console.error("Mongo GET /favs/getAllFavs failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

/**
 * Retrieves favorite entries of a specific user.
 *
 * This controller function forwards a request to the MongoDB satellite server
 * in order to retrieve all favorites associated with the given username.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Route parameters.
 * @param {string} req.params.username - Username whose favorites are requested.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response containing the user's favorites.
 */
async function getFavsByUser(req, res) {
    console.log("GET api/favs/", req.params);
    try {
        const { username } = req.params;
        const response  = await mongo.get(`api/favs/${username}`);
        res.json(response.data);
    } catch (err) {
        console.error("Mongo GET /favs/user failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

module.exports = {getAllFavs, getFavsByUser};
