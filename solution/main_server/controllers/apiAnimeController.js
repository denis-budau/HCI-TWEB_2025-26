const axios = require("axios");

const spring = axios.create({ // Spring satellite port
    baseURL: "http://localhost:8082"
});
/**
 * Retrieves the Top 50 anime list.
 *
 * This function acts as a gateway endpoint on the main server.
 * It forwards the request to the Spring Boot satellite server, which
 * performs the actual database query on PostgreSQL.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response containing the Top 50 anime list.
 */
async function getTop50Anime(req, res) {
    console.log("GET /api/anime");
    try {
        const response = await spring.get("/api/anime");
        res.json(response.data);
    } catch (error) {
        console.error("Spring GET api/anime failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

/**
 * Searches anime by title.
 *
 * This function forwards a search request from the client to the Spring Boot
 * satellite server. The search is performed using a query parameter (`title`)
 * and the resulting list of anime is returned as JSON.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters.
 * @param {string} req.query.title - Title (or partial title) of the anime to search.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response containing the search results.
 */
async function searchAnime(req, res) {
    console.log("GET /api/anime/search", req.query);
    try {
        const { title } = req.query;
        const response = await spring.get("/api/anime/search", { params: { title } });

        res.json(response.data);
        // res.render("pages/anime", { title: "Anime Results", query: title, results: response.data });
    } catch (error) {
        console.error("Spring GET api/anime/search failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

module.exports = {getTop50Anime, searchAnime};
