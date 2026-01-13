const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/apiUserProfileController');


// Tutti gli utenti
router.get('/',userProfileController.get50User)

// Tutte le info di un utente specifico (non serve)
router.get('/:username', userProfileController.getUser)

module.exports = router;