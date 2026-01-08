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

// ROUTER PER AVERE UN ANIME SPECIFICO
router.get('/:anime', anime_controller.getAnimeDetails);

// ROUTER PER AVERE TUTTI GLI ANIME
router.get('/getAnime', anime_controller.getAllAnime);

// ROUTER PER AVERE TUTTI GLI PERSON (ATTORI)
router.get('/getPerson', anime_controller.getAllPerson)

// ROUTER PER AVERE UN PERSON SPECIFICO
router.get('/:person', anime_controller.getPersonDetails)

// ROUTER PER AVERE TUTTE LE INFO DI UN ANIME SPECIFICO,
//router.get('/anime_info', anime_controller.getAnimeInfo);


module.exports = router;