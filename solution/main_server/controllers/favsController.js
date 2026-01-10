const axios = require("axios");

const mongo = axios.create({
    baseURL: "http://localhost:3001", // Mongo satellite port
    timeout: 5000,
});

async function getAllFavs(req, res) {
    console.log("GET /favs/getAllFavs", req.params);
    try {
        const response = await mongo.get("/favs/getAllFavs");
        res.json(response.data);
    } catch (err) {
        console.error("Mongo GET /favs/getAllFavs failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

async function getFavsByUser(req, res) {
    console.log("GET /favs/", req.params);
    try {
        const { username } = req.params;
        const response  = await mongo.get(`/favs/${username}`);
        res.json(response.data);
    } catch (err) {
        console.error("Mongo GET /favs/user failed:", err.message);
        res.status(502).json({ error: "NoSQL satellite unavailable" });
    }
}

module.exports = {getAllFavs, getFavsByUser};
