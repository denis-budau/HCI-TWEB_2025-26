const axios = require("axios");

const mongoApi = axios.create({
    baseURL: "http://localhost:3001", // Mongo satellite port
    timeout: 5000
});

// SONO UGUALI I DUE METODI

// GET /api/recommendations?mal_id=1
async function getRecommendations(req, res) {
    console.log("GET /recommendations", req.query);
    try {
        const response = await mongoApi.get("/recommendations", { params: req.query });
        res.json(response.data);
    } catch (err) {
        console.error("Mongo GET /recommendations failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

// GET /api/recommendations/of/:mal_id
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

module.exports = {
    getRecommendations,
    getRecommendationsAnime
};
