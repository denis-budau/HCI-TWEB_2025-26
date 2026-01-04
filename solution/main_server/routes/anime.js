const express = require('express');
const router = express.Router();
const AXIOS = require('axios');
const anime_controller = require('../controllers/animeController');

/**
 * @swagger
 * /getAnimes:
 *
 *
 * */

// ROUTER PER AVERE TUTTI GLI ANIME
async function getAnime(req, res) {
    try {
        // Effettua una richiesta GET per ottenere tutti i film
        const response = await AXIOS.get(`http://localhost:8080/anime/getAnimes`);

    } catch (error) {
        // Log dell'errore nel caso in cui la richiesta fallisca
        console.error('Errore nel recupero dei film dal server Spring:', error);
        res.status(500).render('pages/error', { message: 'Dati non disponibili' });
    }
}

// ROUTER PER AVERE TUTTE LE INFO DI UN ANIME SPECIFICO,
router.get('/anime_info', anime_controller.getAnimeInfo);


module.exports = router;