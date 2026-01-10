const express = require('express');
const router = express.Router();
const ratingsController = require('../controllers/ratingsController');

// Tutti i ratings dati da un anime
router.get('/anime/:anime_id/ratings', ratingsController.getAnimeRatings)

// Tutti i ratings dati da un utente
router.get('/user/:username/ratings/', ratingsController.getUserRatings)

module.exports = router;