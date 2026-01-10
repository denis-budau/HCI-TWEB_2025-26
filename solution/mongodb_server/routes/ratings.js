var express = require('express');
var router = express.Router();
const ratingsController = require("../controllers/ratingsController");

// Con metodo in controller che comunicherà con il db per ratings di un anime specifico
router.get('/anime/:anime_id/ratings', ratingsController.getAnimeRatings);

// Con metodo in controller che comunicherà con il db per ratings di un utente specifico
router.get('/user/:username/ratings', ratingsController.getUserRatings);

module.exports = router;