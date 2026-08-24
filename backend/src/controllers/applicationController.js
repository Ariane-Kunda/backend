// backend/src/controllers/applicationController.js
import { getDatabase } from '../config/db.js';

export async function applyToJob(req, res) {
    try {
        const { jobId, resumeUrl } = req.body;
        const userId = req.user.id; // Retreived from decoding authorization token

        const db = await getDatabase();
        
        // Block double applications
        const applied = await db.get('SELECT id FROM applications WHERE jobId = ? AND userId = ?', [jobId, userId]);
        if (applied) {
            return res.status(400).json({ error: "You have already applied for this job opening." });
        }

        const result = await db.run(
            'INSERT INTO applications (jobId, userId, resumeUrl) VALUES (?, ?, ?)',
            [jobId, userId, resumeUrl]
        );
        res.status(201).json({ id: result.lastID, jobId, userId, resumeUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getUserApplications(req, res) {
    try {
        const db = await getDatabase();
        const apps = await db.all(`
            SELECT a.id, a.appliedAt, a.resumeUrl, j.title, j.company 
            FROM applications a
            JOIN jobs j ON a.jobId = j.id
            WHERE a.userId = ?
        `, [req.user.id]);
        res.status(200).json(apps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
