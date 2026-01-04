//here go the database operations
const idk = require('../models/idk');

export async function query(filter = {}) {
    // Exclude _id, return plain JS objects
    return Model.find(filter).select('-_id').lean().exec();
}

//it is possible to export multiple functions here, or just defining them with "export"
module.exports = { , /*here go the functions*/ };
