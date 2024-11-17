const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Deek';

module.exports = (req, res, next) => {
    const token = req.cookies.tokens;
    if (!token || token === ' ') {
        return res.redirect('/login');
    }

    try {
        const userData = jwt.verify(token, JWT_SECRET);
        req.user = userData; 
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(400).json({message:'user doesnot exists'})
    }
};
