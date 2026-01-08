const axios = require("axios");

async function getAnimeDetails(req, res) {
    console.log("'➡️ Arrivata richiesta GET /anime/getAnimeDetails su server 3000'")
    try {
        const { anime } = req.params;

        const response = await axios.get(`http://localhost:8082/anime/${anime}`);

        res.json(response.data);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function getAllAnime(req, res) {
    console.log("'➡️ Arrivata richiesta GET /anime/getAllAnime su server 3000'")
    try {
        // Effettua una richiesta GET per ottenere tutti i film
        const response = await axios.get(`http://localhost:8082/anime/getAnime`);

        res.json(response.data);

    } catch (error) {
        // Log dell'errore nel caso in cui la richiesta fallisca
        console.error('Errore nel recupero dei film dal server Spring:', error);
        res.status(500).render('pages/error', { message: 'Dati non disponibili' });
    }
}

async function getPersonDetails(req, res) {
    console.log("'➡️ Arrivata richiesta GET /anime/getPersonDetails su server 3000'")
    try {
        const { person } = req.params;

        const response = await axios.get(`http://localhost:8082/anime/${person}`);

        res.json(response.data);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function getAllPerson(req, res) {
    console.log("'➡️ Arrivata richiesta GET /anime/getAllPerson su server 3000'")
    try {
        // Effettua una richiesta GET per ottenere tutti i person
        const response = await axios.get(`http://localhost:8082/anime/getPerson`);

        res.json(response.data);

    } catch (error) {
        // Log dell'errore nel caso in cui la richiesta fallisca
        console.error('Errore nel recupero dei person dal server Spring:', error);
        res.status(500).render('pages/error', { message: 'Dati non disponibili' });
    }
}

module.exports = {getAnimeDetails, getAllAnime, getPersonDetails, getAllPerson};