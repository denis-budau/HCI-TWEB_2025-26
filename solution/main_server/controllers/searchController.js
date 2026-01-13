async function searchPage(req, res) {
    try {
        const title = req.query.title || "";
        const type = req.query.type || "anime"; // default a anime se non passato
        res.render("pages/search", { title: "Search Results", query: title, type });
    } catch (err) {
        res.status(502).render("pages/error", { message: "SQL satellite unavailable" });
    }
}

module.exports = { searchPage };