const userProfileModel = require('../models/userProfile');

/**
 * Get all user profiles from the database.
 *
 * @async
 * @function getAllUser
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends a JSON array of all user profiles or an error object if failed
 */
async function getAllUser (req, res) {
    try {
        const users = await userProfileModel.find();
        res.status(200).json(users);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

/**
 * Get the top 50 users by number of completed anime.
 *
 * @async
 * @function get50User
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends a JSON array of top 50 users or an error object if failed
 */
async function get50User(req, res) {
    try {
        const topUsers = await userProfileModel.aggregate([
            { $sort: { completed: -1 } },
            { $limit: 50 },
        ]);

        res.status(200).json(topUsers);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
}

/**
 * Get a specific user profile by username.
 *
 * @async
 * @function getUser
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.username - Username of the user to retrieve
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends a JSON object with the user profile or an error object if failed
 */
async function getUser (req, res) {
    try {
        const { username } = req.params;

        // Cerca l’utente nel DB
        const user = await userProfileModel.findOne({ username });

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {getAllUser, get50User, getUser};