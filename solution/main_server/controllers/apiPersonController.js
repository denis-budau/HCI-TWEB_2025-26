const axios = require("axios");

const spring = axios.create({
    baseURL: "http://localhost:8082",
    timeout: 5000,
});

async function getAllPerson(req, res) {
    console.log("GET /api/person");
    try {
        const response = await spring.get("api/person");
        res.json(response.data);
    } catch (error) {
        console.error("Spring GET /person failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

async function searchPerson(req, res) {
    console.log("GET /api/person/search", req.query);
    try {
        const { name } = req.query;
        const response = await spring.get("api/person/search", { params: { name } });

        res.json(response.data);
    } catch (error) {
        console.error("Spring GET /person/search failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

module.exports = {getAllPerson, searchPerson};
