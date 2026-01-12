const axios = require("axios");

/*const spring = axios.create({
    baseURL: "http://localhost:8082",
    timeout: 5000,
});

*/

async function searchPage(req, res) {
    try {
        // const response = await spring.get("/anime/search", { params: { title } });
        const title = req.query.title || "";
        const type = req.query.type || "anime"; // default a anime se non passato
        res.render("pages/search", { title: "Search Results", query: title, type });
    } catch (err) {
        res.status(502).render("pages/error", { message: "SQL satellite unavailable" });
    }
}

module.exports = { searchPage };