import jwt from 'jsonwebtoken';

export const verifyTokenApp = (req, res, next) => { 
    const token = req.header('authorization-token') || req.header('Authorization');  

    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = userVerified;  
        next();  
    } catch (error) {
        return res.status(401).send('Invalid or expired token');
    }
};