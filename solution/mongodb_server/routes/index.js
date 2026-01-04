const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Anime Service' });
});

router.get('/error', (req, res) => {
    res.render('pages/error', { title: 'Error Occurred' });
});

/*TODO EXAMPLE: the routes tipically just call the controller
TODO here we need to put the swagger documentation (be sure llm sees the rest of the function (req.body is just a general way)
const controller = require("../controllers/characters")
router.post('/insert', async (req, res, next) => {
    try {
        const results = await controller.insert(req.body);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

*/

module.exports = router;
