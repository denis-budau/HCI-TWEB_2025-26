const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Anime Service' });
});

router.get('/error', (req, res) => {
    res.render('pages/error', { title: 'Error Occurred' });
});


module.exports = router;
