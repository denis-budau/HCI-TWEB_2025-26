const express = require('express');
const router = express.Router();

/**
 * Renders the main homepage of the application.
 * This route serves the HTML entry point of the main server.
 */
router.get('/', function(req, res) {
    res.render('pages/index', { title: 'Anime Service' });
});

/**
 * Renders a generic error page.
 * Used as a fallback when API calls fail.
 */
router.get('/error', (req, res) => {
    res.render('pages/error', { title: 'Error Occurred' });
});

module.exports = router;
