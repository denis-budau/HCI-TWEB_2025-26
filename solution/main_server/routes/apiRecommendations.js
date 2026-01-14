const express = require("express");
const router = express.Router();
const recommendationsController = require("../controllers/apiRecommendationsController");

/**
 * @swagger
 * tags:
 *   - name: NoSQL Satellite Proxy - Recommendations
 *     description: Main server endpoints that proxy the MongoDB NoSQL satellite (port 3001) for anime recommendations.
 */

/**
 * @swagger
 * /api/recommendations/{mal_id}:
 *   get:
 *     tags:
 *       - NoSQL Satellite Proxy - Recommendations
 *     summary: Retrieve recommendations for a specific anime
 *     description: Returns a list of recommended anime related to the given MyAnimeList ID, proxied from the MongoDB satellite.
 *     parameters:
 *       - in: path
 *         name: mal_id
 *         required: true
 *         description: MyAnimeList ID of the anime
 *         schema:
 *           type: integer
 *           example: 5114
 *     responses:
 *       "200":
 *         description: Recommendations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   mal_id:
 *                     type: integer
 *                     example: 5114
 *                   recommendation_mal_id:
 *                     type: integer
 *                     example: 10234
 *       "502":
 *         description: NoSQL satellite unavailable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: NoSQL satellite unavailable
 */
router.get("/:mal_id", recommendationsController.getRecommendationsAnime);

module.exports = router;
