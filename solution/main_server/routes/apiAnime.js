const express = require("express");
const router = express.Router();
const animeController = require("../controllers/apiAnimeController");
/**
 * @swagger
 * tags:
 *   - name: SQL Satellite Proxy - Anime
 *     description: Main server endpoints that proxy the Spring Boot SQL satellite (port 8082) - anime only routes
 */


/**
 * @swagger
 * /api/anime:
 *   get:
 *     tags: [SQL Satellite Proxy]
 *     summary: Get all anime
 *     responses:
 *       200:
 *         description: List of anime
 *       502:
 *         description: SQL satellite unavailable
 */
router.get("/", animeController.getTop50);

/**
 * @swagger
 * /api/anime/search:
 *   get:
 *     tags: [SQL Satellite Proxy]
 *     summary: Search anime by title (partial match)
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         example: Naruto
 *     responses:
 *       200:
 *         description: Matching anime
 *       502:
 *         description: SQL satellite unavailable
 */
router.get("/search", animeController.searchAnime);

module.exports = router;
