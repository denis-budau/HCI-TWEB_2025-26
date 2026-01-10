var express = require('express');
var router = express.Router();
const userProfileController = require("../controllers/userProfileController");

// Con metodo in controller che comunicherà con il db per lista di tutti gli utenti
router.get('/getAllUser', userProfileController.getAllUser);

// Con metodo in controller che comunicherà con il db per utente specifico
router.get('/:username', userProfileController.getUser);

module.exports = router;