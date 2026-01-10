const express = require("express");
const router = express.Router();
const animeController = require("../controllers/animeController");
/**
 * @swagger
 * tags:
 *   - name: SQL Satellite Proxy
 *     description: Main server endpoints that proxy the Spring Boot SQL satellite (port 8082)
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
 */
router.get("/getAllAnime", animeController.getAllAnime);

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
 */
router.get("/search", animeController.searchAnime);

module.exports = router;
