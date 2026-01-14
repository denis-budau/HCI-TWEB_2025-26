const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/apiUserProfileController');

/**
 * @swagger
 * tags:
 *   - name: NoSQL Satellite Proxy - User Profiles
 *     description: Main server endpoints that proxy the MongoDB NoSQL satellite (port 3001) for user profiles.
 */

/**
 * @swagger
 * /api/userProfile:
 *   get:
 *     tags:
 *       - NoSQL Satellite Proxy - User Profiles
 *     summary: Retrieve top 50 user profiles
 *     description: Proxies the NoSQL satellite endpoint that returns the top 50 users ordered by completed anime.
 *     responses:
 *       "200":
 *         description: User profiles retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       "502":
 *         description: NoSQL satellite unavailable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: NoSQL satellite unavailable
 */
router.get('/', userProfileController.getTop50User);

/**
 * @swagger
 * /api/userProfile/{username}:
 *   get:
 *     tags:
 *       - NoSQL Satellite Proxy - User Profiles
 *     summary: Retrieve a user profile by username (deprecated)
 *     description: >
 *       Proxies the NoSQL satellite endpoint that retrieves a single user profile.
 *       This endpoint is currently not used by the main application and is kept for completeness.
 *     deprecated: true
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user.
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       "200":
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       "502":
 *         description: NoSQL satellite unavailable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: NoSQL satellite unavailable
 */
router.get('/:username', userProfileController.getUser);

module.exports = router;
