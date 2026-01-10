const axios = require("axios");

const spring = axios.create({
    baseURL: "http://localhost:8082",
    timeout: 5000,
});

async function getAllCharacter(req, res) {
    console.log("GET /api/character");
    try {
        const { data } = await spring.get("/character");
        res.json(data);
    } catch (error) {
        console.error("Spring GET /character failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

async function searchCharacter(req, res) {
    console.log("GET /api/character/search", req.query);
    try {
        const { name } = req.query;
        const { data } = await spring.get("/character/search", { params: { name } });
        res.json(data);
    } catch (error) {
        console.error("Spring GET /character/search failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

module.exports = {getAllCharacter, searchCharacter};