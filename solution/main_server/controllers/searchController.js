/**
 * Renders the search results page.
 *
 * This controller function handles requests for searching anime, characters, or persons.
 * It does not perform any database query directly, but passes the query parameters
 * to the view (Handlebars) which will call the appropriate API endpoints via JavaScript.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters from the client.
 * @param {string} [req.query.title=""] - Title or name to search for.
 * @param {string} [req.query.type="anime"] - Type of entity to search ("anime", "character", "person").
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Renders the search page with the provided query and type.
 */
async function searchPage(req, res) {
    try {
        const title = req.query.title || "";
        const type = req.query.type || "anime"; // default anime
        res.render("pages/search", { title: "Search Results", query: title, type });
    } catch (err) {
        res.status(502).render("pages/error", { message: "SQL satellite unavailable" });
    }
}

module.exports = { searchPage };