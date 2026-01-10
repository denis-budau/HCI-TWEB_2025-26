const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');


// Tutti gli utenti
router.get('/getAllUser',userProfileController.getAllUser)

// Tutte le info di un utente specifico
router.get('/:username', userProfileController.getUser)

module.exports = router;