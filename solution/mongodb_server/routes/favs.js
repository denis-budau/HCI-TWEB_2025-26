const express = require("express");
const router = express.Router();
const favsController = require("../controllers/favsController");

/**
 * @swagger
 * /favs/getAllFavs:
 *   get:
 *     summary: Retrieve favorite entries (deprecated)
 *     description: >
 *       Returns favorite records stored in MongoDB.
 *       Optional query parameters can be used to filter results.
 *       This endpoint is currently not used by the main application
 *       and is kept for completeness.
 *     deprecated: true
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: query
 *         name: fav_type
 *         required: false
 *         description: Type of favorite (e.g. anime, character, person).
 *         schema:
 *           type: string
 *           example: anime
 *       - in: query
 *         name: id
 *         required: false
 *         description: MyAnimeList ID of the favorited entity.
 *         schema:
 *           type: integer
 *           example: 5114
 *     responses:
 *       "200":
 *         description: Favorite entries retrieved successfully.
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
 *                   fav_type:
 *                     type: string
 *                     example: anime
 *                   id:
 *                     type: integer
 *                     example: 5114
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
router.get("/getAllFavs", favsController.getAllFavs);


/**
 * @swagger
 * /favs/{username}:
 *   get:
 *     summary: Retrieve favorites of a specific user (deprecated)
 *     description: >
 *       Returns all favorite entries associated with the given username.
 *       This endpoint is currently not used by the main application
 *       and is kept for completeness.
 *     deprecated: true
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username whose favorites should be retrieved.
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       "200":
 *         description: User favorites retrieved successfully.
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
 *                   fav_type:
 *                     type: string
 *                     example: anime
 *                   id:
 *                     type: integer
 *                     example: 5114
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
router.get("/:username", favsController.getFavsByUser);

module.exports = router;
