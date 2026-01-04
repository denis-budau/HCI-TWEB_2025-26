const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

/**
 * @swagger
 * /userProfile:
 *
 *
 * */

// ROUTER PER AVERE TUTTI GLI UTENTI
router.get('/userProfile',async (req, res) => {
    try {
        // Chiamata al secondo server per ottenere i dati degli utenti
        const response = await axios.get('http://localhost:3001/userProfile');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// ROUTER PER AVERE TUTTE LE INFO DI UN UTENTE SPECIFICO, RIFARE CON AWAIT DENTRO ROUTER NON IN CONTROLLER
router.get('/userProfile/:name', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

module.exports = router;