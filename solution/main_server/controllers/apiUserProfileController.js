const axios = require("axios");

const mongo = axios.create({
    baseURL: "http://localhost:3001", // Mongo satellite port
});

async function getTop50User(req, res) {
    console.log('GET api/userProfile/');
    try {
        const response = await mongo.get("api/userProfile/");
        res.json(response.data);
    } catch (err) {
        console.error("Mongo GET api/userProfile failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

async function getUser(req, res) {
    console.log('GET api/userProfile/', req.params);
    try {
        const { username } = req.params;
        const response = await mongo.get(`api/userProfile/${username}`);
        res.json(response.data);
    } catch (error) {
        console.error("Mongo GET /userProfile/${username} failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

module.exports = {getTop50User, getUser};
