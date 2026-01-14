const express = require("express");
const router = express.Router();
const recommendationsController = require("../controllers/apiRecommendationsController");

/**
 * @swagger
 * /recommendations/recommendations:
 *   get:
 *     summary: Retrieve recommendations (deprecated)
 *     description: >
 *       Returns recommendation records stored in MongoDB.
 *       Optional query parameters can be used to filter results.
 *       This endpoint is currently not used by the main application
 *       and is kept for completeness.
 *     deprecated: true
 *     tags:
 *       - Recommendations
 *     parameters:
 *       - in: query
 *         name: mal_id
 *         required: false
 *         description: Filter by the source anime MyAnimeList ID.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: recommendation_mal_id
 *         required: false
 *         description: Filter by the recommended anime MyAnimeList ID.
 *         schema:
 *           type: integer
 *           example: 20
 *     responses:
 *       "200":
 *         description: Recommendations retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   mal_id:
 *                     type: integer
 *                     example: 1
 *                   recommendation_mal_id:
 *                     type: integer
 *                     example: 20
 *       "500":
 *         description: MongoDB internal error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: MongoDB error
 */
router.get("/recommendations", recommendationsController.getRecommendationsAnime);

/**
 * @swagger
 * /recommendations/recommendations/of/{mal_id}:
 *   get:
 *     summary: Retrieve recommendations of a specific anime (deprecated)
 *     description: >
 *       Returns recommendation records for the given anime MyAnimeList ID.
 *       This endpoint is currently not used by the main application
 *       and is kept for completeness.
 *     deprecated: true
 *     tags:
 *       - Recommendations
 *     parameters:
 *       - in: path
 *         name: mal_id
 *         required: true
 *         description: MyAnimeList ID of the source anime.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       "200":
 *         description: Recommendations retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   mal_id:
 *                     type: integer
 *                     example: 1
 *                   recommendation_mal_id:
 *                     type: integer
 *                     example: 20
 *       "500":
 *         description: MongoDB internal error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: MongoDB error
 */
router.get("/recommendations/of/:mal_id", recommendationsController.getRecommendationsAnime);

module.exports = router;
