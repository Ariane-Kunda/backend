
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Base health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "OK", message: "Backend is operational" });
});

export default app;
