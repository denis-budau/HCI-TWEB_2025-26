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
        const users = await userProfileModel.aggregate([
            { $match: { completed: { $exists: true, $ne: null } } },

            // normalize completed into a number (we could have checked with pandas better,
            // but we have some values in MongoDB stored as strings, such as 2,899)

            {
                $addFields: {
                    completedStr: { $toString: "$completed" }
                }
            },
            {
                $addFields: {
                    completedClean: {
                        $replaceAll: { input: "$completedStr", find: ",", replacement: "" }
                    }
                }
            },
            {
                $addFields: {
                    completedNum: {
                        $convert: { input: "$completedClean", to: "int", onError: null, onNull: null }
                    }
                }
            },

            { $match: { completedNum: { $ne: null } } },
            { $sort: { completedNum: -1 } },
            { $limit: 50 },
            { $project: { _id: 0, id: 1, username: 1, location: 1, completed: 1, completedNum: 1 } }
        ]);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error:", error);
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