// backend/src/middleware/errorMiddleware.js

// Resource parameters validation handler utility logic
export function validateRegistrationInput(req, res, next) {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Malformed structural email layout." });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must span across 6 characters minimum." });
    }
    next();
}

// Catch-all Express operational crash routing middleware
export function globalErrorHandler(err, req, res, next) {
    console.error('💥 Critical Error Intercepted:', err.stack);
    res.status(500).json({
        error: "Internal cluster runtime failure occurred.",
        details: process.env.NODE_ENV === 'development' ? err.message : {}
    });
}
