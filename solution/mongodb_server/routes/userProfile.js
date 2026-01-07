var express = require('express');
var router = express.Router();
const userProfileController = require("../controllers/userProfileController");

// Con metodo in controller che comunicherà con il db per lista di tutti gli utenti
router.get('/getUserProfile', userProfileController.getAllUser);

// Con metodo in controller che comunicherà con il db per utente specifico
router.get('/:username', userProfileController.getUser);

// Con metodo in controller che comunicherà con il db per ratings di un anime specifico
router.get('/anime/:anime_id/ratings', userProfileController.getAnimeRatings);

// Con metodo in controller che comunicherà con il db per ratings di un utente specifico
router.get('/user/:username/ratings', userProfileController.getUserRatings);

module.exports = router;