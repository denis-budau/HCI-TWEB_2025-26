const express = require("express");
const router = express.Router();
const recommendationsController = require("../controllers/recommendationsController");

router.get("/recommendations", recommendationsController.getRecommendations);
router.get("/recommendations/of/:mal_id", recommendationsController.getRecommendationsOfAnime);

module.exports = router;
