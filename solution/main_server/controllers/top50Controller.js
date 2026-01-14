/**
 * Renders the Top 50 page.
 *
 * This controller function handles requests to view the Top 50 lists of
 * anime, characters, persons, or users. It does not perform any database query
 * directly, but passes optional query parameters to the view (Handlebars),
 * which will fetch the data via JavaScript API calls.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters from the client.
 * @param {string} [req.query.title=""] - Optional title for the Top 50 page.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Renders the Top 50 page with the provided query.
 */
async function top50Page(req, res) {
    try {
        const title = req.query.title || "";
        res.render("pages/top50", { title: "Top 50 page", query: title });
    } catch (err) {
        res.status(502).render("pages/error", { message: "SQL satellite unavailable" });
    }
}

module.exports = { top50Page };