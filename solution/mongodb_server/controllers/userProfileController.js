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

module.exports = {getAllUser, getUser};