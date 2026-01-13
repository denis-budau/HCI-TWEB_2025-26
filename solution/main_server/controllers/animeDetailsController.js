async function getAnimeDetails(req, res) {
    try {
        const title = req.query.title || "";
        res.render("pages/animedetails", { title: "Search Results", query: title });
    } catch (err) {
        res.status(502).render("pages/error", { message: "SQL satellite unavailable" });
    }
}

module.exports = { getAnimeDetails };