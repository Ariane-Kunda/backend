// backend/src/controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../config/db.js';

export async function register(req, res) {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required registration parameters." });
        }

        const db = await getDatabase();
        const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const assignedRole = role === 'admin' ? 'admin' : 'user';

        const result = await db.run(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, assignedRole]
        );

        return res.status(201).json({ id: result.lastID, name, email, role: assignedRole });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please enter email and password." });
        }

        const db = await getDatabase();
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please enter email and password." });
        }

        const db = await getDatabase();
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
