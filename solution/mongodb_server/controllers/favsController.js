const favModel = require("../models/favs");

// GET /favs?fav_type=anime&id=5114
async function getAllFavs(req, res) {
    try {
        const filter = {};
        if (req.query.fav_type) filter.fav_type = req.query.fav_type;
        if (req.query.id) filter.id = Number(req.query.id);

        const favs = await favModel.find(filter).limit(100);
        res.json(favs);
    } catch (err) {
        console.error("Mongo GET /getAllFavs failed:", err.message);
        res.status(500).json({ error: "MongoDB error" });
    }
}

// GET /favs/:username
async function getFavsByUser(req, res) {
    try {
        const { username } = req.params;
        const favs = await favModel.find({ username });
        res.json(favs);
    } catch (err) {
        console.error("Mongo GET /favs/user failed:", err.message);
        res.status(500).json({ error: "MongoDB error" });
    }
}

module.exports = {getAllFavs, getFavsByUser};
