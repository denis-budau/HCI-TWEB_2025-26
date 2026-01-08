const express = require('express');
const router = express.Router();
const axios = require('axios');
const userProfileController = require('../controllers/userProfileController');


// Tutti gli utenti
router.get('/getUserProfile',async (req, res) => {
    console.log('➡️ Arrivata richiesta GET /userProfile/getUserProfile su server 3000');
    try {
        // Chiamata al secondo server (express) per ottenere i dati degli utenti
        const response = await axios.get('http://localhost:3001/userProfile/getUserProfile');
        console.log('✅ Risposta ricevuta da 3001:', response.data.slice(0, 5));
        const usernames = response.data.map(u => u.username);
        console.log('✅ Username ricevuti:', usernames.slice(0, 10));
        res.json({ usernames: usernames.slice(0, 10) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Tutte le info di un utente specifico
router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;

        const response = await axios.get(`http://localhost:3001/userProfile/${username}`);

        res.json(response.data);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

// Tutti i ratings di un anime
router.get('/anime/:anime_id/ratings', async (req, res) => {
    try {
        const { anime_id } = req.params;

        const response = await axios.get(`http://localhost:3001/userProfile/anime/${anime_id}/ratings`);
        res.json(response.data);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

// Tutti i ratings dati da un utente
router.get('/user/:username/ratings/', async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(`http://localhost:3001/userProfile/user/${username}/ratings`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;