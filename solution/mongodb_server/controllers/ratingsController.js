const ratingModel = require('../models/ratings');

// Metodo per comunicare con il db per ratings di un anime specifico
async function getAnimeRatings (req, res) {
    try {
        const { anime_id } = req.params; // ID dell'anime dalla rotta
        console.log('➡️ getAnimeRatings: richiesta ricevuta per anime id:', anime_id);

        // Prendi tutti i rating con animeId uguale a id
        const ratings = await ratingModel.find({ anime_id });

        console.log(`✅ Trovati ${ratings.length} rating`);
        res.status(200).json(ratings);

    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Metodo per comunicare con il db per ratings di un utente specifico
async function getUserRatings (req, res) {
    console.log('🟡 getUserRatings START');
    try {
        const { username } = req.params;
        console.log('➡️ getUserRatings: richiesta ricevuta per username:', username);

        const ratings = await ratingModel.find({ username });

        res.status(200).json(ratings);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {getAnimeRatings, getUserRatings};