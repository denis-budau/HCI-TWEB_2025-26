const axios = require("axios");

const mongo = axios.create({
    baseURL: "http://localhost:3001", // Mongo satellite port
    timeout: 5000,
});

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
