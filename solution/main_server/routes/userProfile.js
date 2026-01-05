const express = require('express');
const router = express.Router();
const axios = require('axios');
const userProfileController = require('../controllers/userProfileController');

/**
 * @swagger
 * /userProfile:
 *
 *
 * */

// Tutti gli utenti
router.get('/userProfile',async (req, res) => {
    try {
        // Chiamata al secondo server (express) per ottenere i dati degli utenti
        const response = await axios.get('http://localhost:3001/userProfile');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Tutte le info di un utente specifico
router.get('/userProfile/:username', async (req, res) => {
    try {
        const { username } = req.params;

        const response = await axios.get(`http://localhost:3001/userProfile/${username}`);

        res.json(response.data);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

// Tutti i ratings di un anime
router.get('/anime/:id/ratings', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await axios.get(`http://localhost:3001/anime/${id}/ratings`);
        res.json(response.data);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

// Tutti i ratings dati da un utente
router.get('/userProfile/:username/ratings/', async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(`http://localhost:3001/userProfile/${username}/ratings`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;