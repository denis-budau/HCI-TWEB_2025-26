const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Main Server Pages
 *     description: Server-rendered pages of the main Express application
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Main Server Pages]
 *     summary: Home page
 *     description: Renders the main home page of the Anime Service.
 *     responses:
 *       200:
 *         description: HTML home page rendered successfully
 */
router.get('/', function(req, res, next) {
    res.render('pages/index', { title: 'Anime Service' });
});

/**
 * @swagger
 * /error:
 *   get:
 *     tags: [Main Server Pages]
 *     summary: Error page
 *     description: Renders a generic error page.
 *     responses:
 *       200:
 *         description: HTML error page rendered successfully
 */
router.get('/error', (req, res) => {
    res.render('pages/error', { title: 'Error Occurred' });
});

module.exports = router;
