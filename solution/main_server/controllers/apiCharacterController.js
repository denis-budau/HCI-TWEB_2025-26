const axios = require("axios");

const spring = axios.create({
    baseURL: "http://localhost:8082"
});
//http://localhost:8082/api/character/search
async function getAllCharacter(req, res) {
    console.log("GET /api/character");
    try {
        const response = await spring.get("/api/character");
        res.json(response.data);
    } catch (error) {
        console.error("Spring GET /api/character/getAllCharacter failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

async function searchCharacter(req, res) {
    console.log("GET /api/character/search", req.query);
    try {
        const { name } = req.query;
        const response = await spring.get("/api/character/search", { params: { name } });
        res.json(response.data);
    } catch (error) {
        console.error("Spring GET api/character/search failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

module.exports = {getAllCharacter, searchCharacter};