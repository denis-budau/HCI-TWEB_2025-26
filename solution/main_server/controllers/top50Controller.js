async function top50Page(req, res) {
    try {
        const title = req.query.title || "";
        res.render("pages/top50", { title: "Search Results", query: title });
    } catch (err) {
        res.status(502).render("pages/error", { message: "SQL satellite unavailable" });
    }
}

module.exports = { top50Page };