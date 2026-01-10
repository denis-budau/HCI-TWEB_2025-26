const express = require("express");
const router = express.Router();
const personsController = require("../controllers/personsController");

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
router.get("/persons", personsController.getAllPersons);

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
router.get("/persons/search", personsController.searchPersons);

module.exports = router;