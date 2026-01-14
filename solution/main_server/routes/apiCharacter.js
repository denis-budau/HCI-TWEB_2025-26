const express = require("express");
const router = express.Router();
const characterController = require("../controllers/apiCharacterController");

/**
 * @swagger
 * tags:
 *   - name: SQL Satellite Proxy - Character
 *     description: Main server endpoints that proxy the Spring Boot SQL satellite (port 8082) for character routes.
 */

/**
 * @swagger
 * /api/character:
 *   get:
 *     tags:
 *       - SQL Satellite Proxy - Character
 *     summary: Get top 50 characters
 *     description: Proxies the SQL satellite endpoint that returns the top 50 character by favorites.
 *     responses:
 *       "200":
 *         description: Characters retrieved successfully.
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
router.get("/", characterController.getTop50Character);

/**
 * @swagger
 * /api/character/search:
 *   get:
 *     tags:
 *       - SQL Satellite Proxy - Character
 *     summary: Search characters by name (partial match)
 *     description: Proxies the SQL satellite search endpoint (case-insensitive match on name).
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Name (or part of it) to search for.
 *         schema:
 *           type: string
 *           example: Eleven
 *     responses:
 *       "200":
 *         description: Matching characters retrieved successfully.
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
router.get("/search", characterController.searchCharacter);

module.exports = router;
