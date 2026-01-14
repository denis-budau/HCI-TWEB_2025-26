/**
 * Renders the Anime Details page.
 *
 * This controller function handles requests to view detailed information
 * about a specific anime. It does not perform any database query directly,
 * but passes the anime title to the view (Handlebars), which will fetch
 * the data via JavaScript API calls.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters from the client.
 * @param {string} [req.query.title=""] - Title of the anime to display details for.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Renders the anime details page with the provided title.
 */
async function getAnimeDetails(req, res) {
    try {
        const title = req.query.title || "";
        res.render("pages/animedetails", { title: `${title}`, query: title });
    } catch (err) {
        res.status(502).render("pages/error", { message: "SQL satellite unavailable" });
    }
}

module.exports = { getAnimeDetails };