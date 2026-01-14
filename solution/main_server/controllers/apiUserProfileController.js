const axios = require("axios");

const mongo = axios.create({
    baseURL: "http://localhost:3001", // Mongo satellite port
});

/**
 * Retrieves the Top 50 user profiles.
 *
 * This controller function acts as a gateway endpoint on the main server.
 * It forwards the request to the MongoDB satellite server, which stores
 * and manages the dynamic user data.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response containing the Top 50 users.
 */
async function getTop50User(req, res) {
    console.log('GET /api/userProfile/');
    try {
        const response = await mongo.get("/api/userProfile/");
        res.json(response.data);
    } catch (err) {
        console.error("Mongo GET api/userProfile failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

/**
 * Retrieves the profile of a specific user by username.
 *
 * This function forwards the request to the MongoDB satellite server,
 * which manages dynamic user data and returns the requested profile as JSON.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Route parameters.
 * @param {string} req.params.username - Username of the user to retrieve.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response containing the user profile.
 */
async function getUser(req, res) {
    console.log('GET /api/userProfile/', req.params);
    try {
        const { username } = req.params;
        const response = await mongo.get(`/api/userProfile/${username}`);
        res.json(response.data);
    } catch (error) {
        console.error("Mongo GET /userProfile/${username} failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

module.exports = {getTop50User, getUser};
