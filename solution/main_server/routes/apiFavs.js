const express = require("express");
const router = express.Router();
const favsController = require("../controllers/apiFavsController");


/**
 * @swagger
 * tags:
 *   - name: NoSQL Satellite Proxy - Favorites
 *     description: Main server endpoints that proxy the MongoDB NoSQL satellite (port 3001) for favorites.
 *           This endpoint is currently not used by the main application and is kept for completeness.
 */

/**
 * @swagger
 * /api/favs/getAllFavs:
 *   get:
 *     tags:
 *       - NoSQL Satellite Proxy - Favorites
 *     summary: Retrieve all favorite entries
 *     description: >
 *       Returns favorite records from the NoSQL satellite via the main server proxy.
 *       Optional query parameters can be used at the satellite level.
 *     parameters:
 *       - in: query
 *         name: fav_type
 *         required: false
 *         description: Type of favorite (e.g. anime, character, person)
 *         schema:
 *           type: string
 *           example: anime
 *       - in: query
 *         name: id
 *         required: false
 *         description: MyAnimeList ID of the favorited entity
 *         schema:
 *           type: integer
 *           example: 5114
 *     responses:
 *       "200":
 *         description: Favorites retrieved successfully
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
router.get("/getAllFavs", favsController.getAllFavs);

/**
 * @swagger
 * /api/favs/{username}:
 *   get:
 *     tags:
 *       - NoSQL Satellite Proxy - Favorites
 *     summary: Retrieve favorites of a specific user
 *     description: Returns all favorite entries associated with the given username via the main server proxy.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username whose favorites should be retrieved
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       "200":
 *         description: User favorites retrieved successfully
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
router.get("/:username", favsController.getFavsByUser);

module.exports = router;
