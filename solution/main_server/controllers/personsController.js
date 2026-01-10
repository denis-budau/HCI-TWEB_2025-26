const axios = require("axios");

const spring = axios.create({
    baseURL: "http://localhost:8082",
    timeout: 5000,
});

async function getAllPersons(req, res) {
    console.log("GET /api/persons");
    try {
        const { data } = await spring.get("/persons");
        res.json(data);
    } catch (error) {
        console.error("Spring GET /persons failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

async function searchPersons(req, res) {
    console.log("GET /api/persons/search", req.query);
    try {
        const { name } = req.query;
        const { data } = await spring.get("/persons/search", { params: { name } });
        res.json(data);
    } catch (error) {
        console.error("Spring GET /persons/search failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

module.exports = {getAllPersons, searchPersons};