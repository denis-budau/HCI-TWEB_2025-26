const express = require("express");
const router = express.Router();
const characterController = require("../controllers/apiCharacterController");

/**
 * @swagger
 * tags:
 *   - name: SQL Satellite Proxy - Character
 *     description: Main server endpoints that proxy the Spring Boot SQL satellite (port 8082) - character only routes
 */

/**
 * @swagger
 * /api/character:
 *   get:
 *     tags: [SQL Satellite Proxy]
 *     summary: Get all characters
 *     description: Proxies the request to the SQL satellite (Spring Boot).
 *     responses:
 *       200:
 *         description: List of characters
 *       502:
 *         description: SQL satellite unavailable
 */
router.get("/", characterController.getAllCharacter);

/**
 * @swagger
 * /api/character/search:
 *   get:
 *     tags: [SQL Satellite Proxy]
 *     summary: Search characters by name (partial match)
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: Eleven
 *     responses:
 *       200:
 *         description: Matching characters
 *       502:
 *         description: SQL satellite unavailable
 */
router.get("/search", characterController.searchCharacter);

module.exports = router;