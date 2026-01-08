const express = require('express');
const router = express.Router();
const axios = require('axios');
const anime_controller = require('../controllers/animeController');

/**
 * @swagger
 * /getAnimes:
 *
 *
 * */

router.get('/details/:anime', anime_controller.getAnimeDetails);

// ROUTER PER AVERE TUTTI GLI ANIME
router.get('/getAnime', anime_controller.getAllAnime);

// ROUTER PER AVERE TUTTE LE INFO DI UN ANIME SPECIFICO,
//router.get('/anime_info', anime_controller.getAnimeInfo);


module.exports = router;