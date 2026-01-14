const express = require('express');
const router = express.Router();
const ratingsController = require('../controllers/apiRatingsController');

/**
 * @swagger
 * tags:
 *   - name: NoSQL Satellite Proxy - Ratings
 *     description: Main server endpoints that proxy the MongoDB NoSQL satellite (port 3001) for ratings.
 *               This endpoint is currently not used by the main application and is kept for completeness.
 */

/**
 * @swagger
 * /api/ratings/anime/{anime_id}/ratings:
 *   get:
 *     tags:
 *       - NoSQL Satellite Proxy - Ratings
 *     summary: Retrieve ratings for a specific anime
 *     description: Returns all ratings given to a specific anime, proxied from the MongoDB satellite.
 *     parameters:
 *       - in: path
 *         name: anime_id
 *         required: true
 *         description: MyAnimeList ID of the anime
 *         schema:
 *           type: integer
 *           example: 5114
 *     responses:
 *       "200":
 *         description: Ratings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: ishikawas
 *                   anime_id:
 *                     type: integer
 *                     example: 5114
 *                   status:
 *                     type: string
 *                     example: watching
 *                   score:
 *                     type: number
 *                     example: 9
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
router.get('/anime/:anime_id/ratings', ratingsController.getAnimeRatings)

/**
 * @swagger
 * /api/ratings/user/{username}/ratings:
 *   get:
 *     tags:
 *       - NoSQL Satellite Proxy - Ratings
 *     summary: Retrieve all ratings given by a user
 *     description: Returns all ratings provided by the specified user, proxied from the MongoDB satellite.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       "200":
 *         description: User ratings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   anime_id:
 *                     type: integer
 *                     example: 5114
 *                   status:
 *                     type: string
 *                     example: watching
 *                   score:
 *                     type: number
 *                     example: 9
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
router.get('/user/:username/ratings/', ratingsController.getUserRatings)

module.exports = router;