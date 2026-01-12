const axios = require("axios");

/*
const spring = axios.create({
    baseURL: "http://localhost:8082",
    timeout: 5000,
});
*/

async function getAllCharacterPage(req, res) {
    const title = req.query.title || "";
    try {
        res.render("pages/getCharacter", { title: "Character Results", query: title || ""});
    } catch (err) {
        res.status(502).render("pages/error", { message: "SQL satellite unavailable" });
    }
}

async function getAllAnimePage(req, res) {
    const title = req.query.title || "";
    try {
        res.render("pages/getAnime", { title: "Anime Results", query: title || ""});
    } catch (err) {
        res.status(502).render("pages/error", { message: "SQL satellite unavailable" });
    }
}

async function searchCharacterPage(req, res) {
    const title = req.query.title || "";
    try {
        // const response = await spring.get("/anime/search", { params: { title } });
        res.render("pages/anime", { title: "Character Results", query: title || "" });
    } catch (err) {
        res.status(502).render("pages/error", { message: "SQL satellite unavailable" });
    }
}

module.exports = { getAllCharacterPage, searchCharacterPage };