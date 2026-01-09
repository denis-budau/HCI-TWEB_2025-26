const axios = require("axios");

const mongoApi = axios.create({
    baseURL: "http://localhost:3001", // Mongo satellite port
    timeout: 5000
});

// GET /api/recommendations?mal_id=1
async function getRecommendations(req, res) {
    console.log("GET /api/recommendations", req.query);
    try {
        const { data } = await mongoApi.get("/recommendations", { params: req.query });
        res.json(data);
    } catch (err) {
        console.error("Mongo GET /recommendations failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

// GET /api/recommendations/of/:mal_id
async function getRecommendationsOfAnime(req, res) {
    console.log("GET /api/recommendations/of/:mal_id", req.params);
    try {
        const { mal_id } = req.params;
        const { data } = await mongoApi.get(`/recommendations/of/${mal_id}`);
        res.json(data);
    } catch (err) {
        console.error("Mongo GET /recommendations/of/:mal_id failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

module.exports = {
    getRecommendations,
    getRecommendationsOfAnime
};
