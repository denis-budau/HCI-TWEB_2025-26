const axios = require("axios");

const mongoApi = axios.create({
    baseURL: "http://localhost:3001", // Mongo satellite port
    timeout: 5000,
});

async function getAllUser(req, res) {
    console.log('GET /userProfile/getAllUser', req.query);
    try {
        const response = await mongoApi.get("/userProfile");
        res.json(response);
    } catch (err) {
        console.error("Mongo GET /userProfile failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

async function getUser(req, res) {
    console.log('GET /userProfile/getUser', req.query);
    try {
        const { username } = req.params;
        const response = await axios.get(`http://localhost:3001/userProfile/${username}`);
        res.json(response.data);
    } catch (error) {
        console.error("Mongo GET /userProfile/${username} failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

module.exports = {getAllUser, getUser};
