const userProfileModel = require('../models/userProfile');
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

    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Metodo per comunicare con il db per ratings di un anime specifico
exports.getAnimeRatings = async (req, res) => {
    try {

    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Metodo per comunicare con il db per ratings di un utente specifico
exports.getUserRatings = async (req, res) => {
    try {

    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}