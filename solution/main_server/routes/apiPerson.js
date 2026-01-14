const express = require("express");
const router = express.Router();
const personController = require("../controllers/apiPersonController");

/**
 * @swagger
 * tags:
 *   - name: SQL Satellite Proxy - Person
 *     description: Main server endpoints that proxy the Spring Boot SQL satellite (port 8082) for person routes.
 */

/**
 * @swagger
 * /api/person:
 *   get:
 *     tags:
 *       - SQL Satellite Proxy - Person
 *     summary: Get top 50 persons
 *     description: Proxies the SQL satellite endpoint that returns the top 50 persons by favorites.
 *     responses:
 *       "200":
 *         description: Person list retrieved successfully.
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
router.get("/", personController.getTop50Person);

/**
 * @swagger
 * /api/person/search:
 *   get:
 *     tags:
 *       - SQL Satellite Proxy - Person
 *     summary: Search persons by name (partial match)
 *     description: Proxies the SQL satellite search endpoint (case-insensitive match on name).
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Name (or part of it) to search for.
 *         schema:
 *           type: string
 *           example: Hayao
 *     responses:
 *       "200":
 *         description: Matching persons retrieved successfully.
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
router.get("/search", personController.searchPerson);

module.exports = router;
