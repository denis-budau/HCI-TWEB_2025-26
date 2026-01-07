const userProfileModel = require('../models/userProfile');
const ratingModel = require('../models/ratings');
//  Metodo per comunicare con il db per lista di tutti gli utenti
exports.getAllUser = async (req, res) => {
    console.log('➡️ getAllUser: richiesta ricevuta al controller 3001');
    try {
        // prende tutti gli utenti dalla collection
        const users = await userProfileModel.find();

        // risponde al client (main server o browser)
        res.status(200).json(users);
    } catch (error) {
    // Gestisce eventuali errori durante il recupero dei critici
    res.status(500).json({ error: error.message });
    }
};

// Metodo per comunicare con il db per utente specifico
exports.getUser = async (req, res) => {
    try {
        const { username } = req.params;

        // Cerca l’utente nel DB
        const user = await userProfileModel.findOne({ username });

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Metodo per comunicare con il db per ratings di un anime specifico
exports.getAnimeRatings = async (req, res) => {
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
exports.getUserRatings = async (req, res) => {
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