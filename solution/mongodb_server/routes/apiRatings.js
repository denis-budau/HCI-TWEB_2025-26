var express = require('express');
var router = express.Router();
const ratingsController = require("../controllers/apiRatingsController");

/**
 * @swagger
 * /ratings/anime/{anime_id}/ratings:
 *   get:
 *     summary: Retrieve ratings of a specific anime (deprecated)
 *     description: >
 *       Returns all rating records associated with the given anime MyAnimeList ID.
 *       This endpoint is currently not used by the main application
 *       and is kept for completeness.
 *     deprecated: true
 *     tags:
 *       - Ratings
 *     parameters:
 *       - in: path
 *         name: anime_id
 *         required: true
 *         description: MyAnimeList ID of the anime.
 *         schema:
 *           type: integer
 *           example: 5114
 *     responses:
 *       "200":
 *         description: Anime ratings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: johndoe
 *                   anime_id:
 *                     type: integer
 *                     example: 5114
 *                   rating:
 *                     type: integer
 *                     example: 8
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
router.get('/anime/:anime_id/ratings', ratingsController.getAnimeRatings);


/**
 * @swagger
 * /ratings/user/{username}/ratings:
 *   get:
 *     summary: Retrieve ratings of a specific user (deprecated)
 *     description: >
 *       Returns all rating records associated with the given username.
 *       This endpoint is currently not used by the main application
 *       and is kept for completeness.
 *     deprecated: true
 *     tags:
 *       - Ratings
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username whose ratings should be retrieved.
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       "200":
 *         description: User ratings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: johndoe
 *                   anime_id:
 *                     type: integer
 *                     example: 5114
 *                   rating:
 *                     type: integer
 *                     example: 8
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
router.get('/user/:username/ratings', ratingsController.getUserRatings);

module.exports = router;
