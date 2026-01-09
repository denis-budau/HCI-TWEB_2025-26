const express = require("express");
const router = express.Router();
const recommendationsController = require("../controllers/recommendationsController");

// all
router.get("/recommendations", recommendationsController.getRecommendations);

// by mal_id
router.get("/recommendations/of/:mal_id", recommendationsController.getRecommendationsOfAnime);

module.exports = router;
