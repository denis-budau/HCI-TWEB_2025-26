const axios = require("axios");

const mongo = axios.create({
    baseURL: "http://localhost:3001", // Mongo satellite port
    timeout: 5000,
});

async function getAllUser(req, res) {
    console.log('GET /userProfile/getAllUser');
    try {
        const response = await mongo.get("/userProfile/getAllUser");
        res.json(response.data);
    } catch (err) {
        console.error("Mongo GET /userProfile failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

async function getUser(req, res) {
    console.log('GET /userProfile/', req.params);
    try {
        const { username } = req.params;
        const response = await mongo.get(`/userProfile/${username}`);
        res.json(response.data);
    } catch (error) {
        console.error("Mongo GET /userProfile/${username} failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

module.exports = {getAllUser, getUser};
