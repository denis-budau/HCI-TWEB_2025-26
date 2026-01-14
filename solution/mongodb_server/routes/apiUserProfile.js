var express = require('express');
var router = express.Router();
const userProfileController = require("../controllers/apiUserProfileController");

/**
 * @swagger
 * /api/userProfile/getAllUser:
 *   get:
 *     summary: Retrieve all user profiles (deprecated)
 *     description: >
 *       This endpoint is not used by the main application and is kept for completeness.
 *     deprecated: true
 *     tags:
 *       - User Profiles
 *     responses:
 *       "200":
 *         description: User profiles retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 12345
 *                   username:
 *                     type: string
 *                     example: johndoe
 *                   location:
 *                     type: string
 *                     example: Italy
 *                   completed:
 *                     type: string
 *                     description: >
 *                       Number of completed anime.
 *                       Stored as a string due to inconsistent formatting in the original dataset.
 *                     example: "2,899"
 *       "500":
 *         description: Internal server error.
 */
router.get('/getAllUser', userProfileController.getAllUser);


/**
 * @swagger
 * /api/userProfile:
 *   get:
 *     summary: Retrieve top 50 users by completed anime
 *     description: Returns the top 50 users ordered by the number of completed anime.
 *     tags:
 *       - User Profiles
 *     responses:
 *       "200":
 *         description: Top 50 users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 12345
 *                   username:
 *                     type: string
 *                     example: johndoe
 *                   location:
 *                     type: string
 *                     example: Italy
 *                   completed:
 *                     type: string
 *                     example: "2899"
 *                   completedNum:
 *                     type: integer
 *                     example: 2899
 *       "500":
 *         description: Internal server error.
 */
router.get('/', userProfileController.get50User);

module.exports = router;