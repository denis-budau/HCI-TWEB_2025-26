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
router.get("/anime", animeController.getAllAnime);

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
 *         example: naruto
 *     responses:
 *       200:
 *         description: Matching anime
 */
router.get("/anime/search", animeController.searchAnime);

/**
 * @swagger
 * /api/persons:
 *   get:
 *     tags: [SQL Satellite Proxy]
 *     summary: Get all persons
 *     responses:
 *       200:
 *         description: List of persons
 */
router.get("/persons", animeController.getAllPersons);

/**
 * @swagger
 * /api/persons/search:
 *   get:
 *     tags: [SQL Satellite Proxy]
 *     summary: Search persons by name (partial match)
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: Hayao
 *     responses:
 *       200:
 *         description: Matching persons
 */
router.get("/persons/search", animeController.searchPersons);

router.get("/character", animeController.getAllCharacter);

router.get("/character/search", animeController.searchCharacter);

module.exports = router;
