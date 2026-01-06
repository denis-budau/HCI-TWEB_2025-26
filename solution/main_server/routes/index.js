const express = require('express');
const router = express.Router();

/**TODO CHANGE THIS TO ANIME
 * @swagger
 * tags:
 *   - name: Home
 *     description: Landing page
 *   - name: Anime
 *     description: Anime website
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WeatherRequest:
 *       type: object
 *       required: [city, date]
 *       properties:
 *         city:
 *           type: string
 *           example: "Turin"
 *         date:
 *           type: string
 *           format: date
 *           description: ISO date (YYYY-MM-DD)
 *           example: "2025-11-12"
 *
 *     CurrentWeather:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           example: "2025-11-12"
 *         forecast:
 *           type: string
 *           example: "Sunny, 23°C"
 *
 *     CurrentWeatherResponse:
 *       type: object
 *       properties:
 *         currentWeather:
 *           $ref: '#/components/schemas/CurrentWeather'
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "data received is incorrect"
 */
/* GET home page. */
/**
 * @swagger
 * /:
 *   get:
 *     summary: Render the home page
 *     description: Returns the main HTML page rendered by the server.
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: HTML content of the home page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: "<!doctype html><html><head><title>Express</title></head><body>...</body></html>"
 *       500:
 *         description: Server error while rendering
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Anime Service' });
});

router.get('/error', (req, res) => {
    res.render('pages/error', { title: 'Error Occurred' });
});


module.exports = router;
