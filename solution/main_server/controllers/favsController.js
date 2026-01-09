const axios = require("axios");

const mongoApi = axios.create({
    baseURL: "http://localhost:3001", // Mongo satellite port
    timeout: 5000,
});

async function getFavs(req, res) {
    console.log("GET /api/favs", req.query);
    try {
        const { data } = await mongoApi.get("/favs", { params: req.query });
        res.json(data);
    } catch (err) {
        console.error("Mongo GET /favs failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

async function getFavsByUser(req, res) {
    console.log("GET /api/favs/user", req.params);
    try {
        const { username } = req.params;
        const { data } = await mongoApi.get(`/favs/user/${username}`);
        res.json(data);
    } catch (err) {
        console.error("Mongo GET /favs/user failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

module.exports = {
    getFavs,
    getFavsByUser
};
