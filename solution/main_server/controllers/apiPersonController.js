const axios = require("axios");

const spring = axios.create({ // Spring satellite port
    baseURL: "http://localhost:8082"
});

/**
 * Retrieves the Top 50 persons.
 *
 * This controller function acts as a gateway endpoint on the main server.
 * It forwards the request to the Spring Boot satellite server, which
 * performs the actual database query on PostgreSQL.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response containing the Top 50 persons.
 */
async function getTop50Person(req, res) {
    console.log("GET /api/person");
    try {
        const response = await spring.get("/api/person");
        res.json(response.data);
    } catch (error) {
        console.error("Spring GET api/person failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}
/**
 * Searches persons by name.
 *
 * This function forwards a search request from the client to the Spring Boot
 * satellite server. The search is performed using a query parameter (`name`)
 * and the resulting list of persons is returned as JSON.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters.
 * @param {string} req.query.name - Name (or partial name) of the person to search.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response containing the search results.
 */
async function searchPerson(req, res) {
    console.log("GET /api/person/search", req.query);
    try {
        const { name } = req.query;
        const response = await spring.get("/api/person/search", { params: { name } });

        res.json(response.data);
    } catch (error) {
        console.error("Spring GET api/person/search failed:", error.message);
        res.status(502).json({ error: "SQL satellite unavailable" });
    }
}

module.exports = {getTop50Person, searchPerson};
