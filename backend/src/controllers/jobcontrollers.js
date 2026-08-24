// backend/src/controllers/jobController.js
import { getDatabase } from '../config/db.js';

export async function createJob(req, res) {
    try {
        const { title, company, location, description, salary } = req.body;
        const db = await getDatabase();
        const result = await db.run(
            'INSERT INTO jobs (title, company, location, description, salary) VALUES (?, ?, ?, ?, ?)',
            [title, company, location, description, salary]
        );
        res.status(201).json({ id: result.lastID, title, company, location, description, salary });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateJob(req, res) {
    try {
        const { id } = req.params;
        const { title, company, location, description, salary } = req.body;
        const db = await getDatabase();
        await db.run(
            'UPDATE jobs SET title = ?, company = ?, location = ?, description = ?, salary = ? WHERE id = ?',
            [title, company, location, description, salary, id]
        );
        res.status(200).json({ message: "Job post modified successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function deleteJob(req, res) {
    try {
        const { id } = req.params;
        const db = await getDatabase();
        await db.run('DELETE FROM jobs WHERE id = ?', [id]);
        res.status(200).json({ message: "Job post eliminated successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export async function getJobs(req, res) {
    try {
        const { search, location } = req.query;
        const db = await getDatabase();
        
        let query = 'SELECT * FROM jobs WHERE 1=1';
        let params = [];

        if (search) {
            query += ' AND (title LIKE ? OR description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }
        if (location) {
            query += ' AND location LIKE ?';
            params.push(`%${location}%`);
        }

        query += ' ORDER BY createdAt DESC';
        const jobs = await db.all(query, params);
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
