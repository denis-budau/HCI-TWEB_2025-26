const Recommendation = require("../models/Recommendations");

// GET /recommendations?mal_id=1&recommendation_mal_id=20
async function getRecommendations(req, res) {
    try {
        const filter = {};

        if (req.query.mal_id) filter.mal_id = Number(req.query.mal_id);
        if (req.query.recommendation_mal_id) {
            filter.recommendation_mal_id = Number(req.query.recommendation_mal_id);
        }

        const rows = await Recommendation.find(filter).limit(200);
        res.json(rows);
    } catch (err) {
        console.error("Mongo GET /recommendations failed:", err.message);
        res.status(500).json({ error: "MongoDB error" });
    }
}

// GET /recommendations/of/:mal_id
async function getRecommendationsOfAnime(req, res) {
    try {
        const mal_id = Number(req.params.mal_id);
        const rows = await Recommendation.find({ mal_id }).limit(200);
        res.json(rows);
    } catch (err) {
        console.error("Mongo GET /recommendations/of/:mal_id failed:", err.message);
        res.status(500).json({ error: "MongoDB error" });
    }
}

module.exports = {getRecommendations, getRecommendationsOfAnime};
