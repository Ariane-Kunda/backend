// backend/src/server.js
import app from './app.js';
import { getDatabase } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;

// Initialize Database connection before binding server port
async function startServer() {
    try {
        await getDatabase();
        console.log('📦 Database initialized successfully.');
        app.listen(PORT, () => console.log(`🚀 Server processing requests on port ${PORT}`));
    } catch (error) {
        console.error('❌ Server startup failure:', error);
        process.exit(1);
    }
}

startServer();
