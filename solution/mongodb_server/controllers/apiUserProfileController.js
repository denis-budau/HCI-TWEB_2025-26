const userProfileModel = require('../models/userProfile');

//  Metodo per comunicare con il db per lista di tutti gli utenti
async function getAllUser (req, res) {
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

async function get50User(req, res) {
    try {
        const users = await userProfileModel.find({
            // Questo filtro è fondamentale:
            // Salta tutti i documenti dove 'completed' non esiste o è null
            completed: { $exists: true, $ne: null }
        })
            .sort({ completed: -1 }) // Ordina dal più grande al più piccolo
            .limit(50);              // Prendi i primi 50 della classifica

        res.status(200).json(users);
    } catch (error) {
        console.error("Errore:", error);
        res.status(500).json({ error: error.message });
    }
}

// Metodo per comunicare con il db per utente specifico
async function getUser (req, res) {
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

module.exports = {getAllUser, get50User, getUser};