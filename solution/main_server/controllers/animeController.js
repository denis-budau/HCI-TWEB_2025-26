const axios = require("axios");

const spring = axios.create({
    baseURL: "http://localhost:8082",
    timeout: 5000,
});

async function getAllAnime(req, res) {
    console.log("➡️ GET /api/anime");
    try {
        const { data } = await spring.get("/anime");
        res.json(data);
    } catch (error) {
        console.error("Spring GET /anime failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

async function searchAnime(req, res) {
    console.log("➡️ GET /api/anime/search", req.query);
    try {
        const { title } = req.query;
        const { data } = await spring.get("/anime/search", { params: { title } });
        res.json(data);
    } catch (error) {
        console.error("Spring GET /anime/search failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

async function getAllPersons(req, res) {
    console.log("➡️ GET /api/persons");
    try {
        const { data } = await spring.get("/persons");
        res.json(data);
    } catch (error) {
        console.error("Spring GET /persons failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

async function searchPersons(req, res) {
    console.log("➡️ GET /api/persons/search", req.query);
    try {
        const { name } = req.query;
        const { data } = await spring.get("/persons/search", { params: { name } });
        res.json(data);
    } catch (error) {
        console.error("Spring GET /persons/search failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

async function getAllCharacter(req, res) {
    console.log("➡️ GET /api/character");
    try {
        const { data } = await spring.get("/character");
        res.json(data);
    } catch (error) {
        console.error("Spring GET /character failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

async function searchCharacter(req, res) {
    console.log("➡️ GET /api/character/search", req.query);
    try {
        const { name } = req.query;
        const { data } = await spring.get("/character/search", { params: { name } });
        res.json(data);
    } catch (error) {
        console.error("Spring GET /character/search failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

module.exports = {
    getAllAnime,
    searchAnime,
    getAllPersons,
    searchPersons,
    getAllCharacter,
    searchCharacter
};
