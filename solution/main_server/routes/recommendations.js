const express = require("express");
const router = express.Router();
const recommendationsController = require("../controllers/recommendationsController");

router.get("/getAllRecommendations", recommendationsController.getRecommendations);
router.get("/:mal_id", recommendationsController.getRecommendationsAnime);

module.exports = router;
