const mongoose = require('mongoose'); // Required mongoose library to connect to MongoDB

// URL definition of the specific MongoDB database we want to use
const mongoURI = 'mongodb://localhost:27017/anime';


export async function connectDB() {
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000, // fail fast if not reachable
        });
        console.log('✅ Connected to MongoDB successfully');
    } catch (err) {
        console.error('❌ Failed to connect to MongoDB:', err.message);
        process.exit(1); // exit the process if DB connection fails
    }
}


export default mongoose;