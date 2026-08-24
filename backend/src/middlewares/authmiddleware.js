// backend/src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export function protect(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Authorization denied. Token missing." });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user payload metadata containing id and role
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token signature validation failed." });
    }
}

export function authorizeAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ error: "Access restricted. Admin credentials required." });
    }
}
