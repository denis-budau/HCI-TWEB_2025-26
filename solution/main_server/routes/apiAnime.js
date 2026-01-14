const express = require("express");
const router = express.Router();
const animeController = require("../controllers/apiAnimeController");

/**
 * @swagger
 * tags:
 *   - name: SQL Satellite Proxy - Anime
 *     description: Main server endpoints that proxy the Spring Boot SQL satellite (port 8082) for anime routes.
 */

/**
 * @swagger
 * /api/anime:
 *   get:
 *     tags:
 *       - SQL Satellite Proxy - Anime
 *     summary: Get top 50 anime
 *     description: Proxies the SQL satellite endpoint that returns the top 50 anime by rank.
 *     responses:
 *       "200":
 *         description: Anime list retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       "502":
 *         description: SQL satellite unavailable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: SQL satellite unavailable
 */
router.get("/", animeController.getTop50Anime);

/**
 * @swagger
 * /api/anime/search:
 *   get:
 *     tags:
 *       - SQL Satellite Proxy - Anime
 *     summary: Search anime by title (partial match)
 *     description: Proxies the SQL satellite search endpoint (case-insensitive match on title).
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         description: Title (or part of it) to search for.
 *         schema:
 *           type: string
 *           example: Naruto
 *     responses:
 *       "200":
 *         description: Matching anime retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       "502":
 *         description: SQL satellite unavailable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: SQL satellite unavailable
 */
router.get("/search", animeController.searchAnime);

module.exports = router;
