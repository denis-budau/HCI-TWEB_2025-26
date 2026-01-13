const axios = require("axios");

const spring = axios.create({
    baseURL: "http://localhost:8082",
    timeout: 5000,
});

async function getTop50(req, res) {
    console.log("GET /api/anime");
    try {
        const response = await spring.get("/api/anime");
        res.json(response.data);
    } catch (error) {
        console.error("Spring GET /anime failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

async function searchAnime(req, res) {
    console.log("GET /api/anime/search", req.query);
    try {
        const { title } = req.query;
        const response = await spring.get("/api/anime/search", { params: { title } });

        res.json(response.data);
        // res.render("pages/anime", { title: "Anime Results", query: title, results: response.data });
    } catch (error) {
        console.error("Spring GET /anime/search failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

module.exports = {getTop50, searchAnime};
