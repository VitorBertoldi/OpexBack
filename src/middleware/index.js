import jwt from 'jsonwebtoken';

export const verifyTokenApp = (req, res, next) => { 
    const token = req.header('authorization-token') || req.header('authorization');  

    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = userVerified;  
        next();  
    } catch (error) {
        return res.status(401).send('Invalid or expired token');
    }
};
export const verifyToken = (req, res) => { 
    const token = req.header('authorization-token') || req.header('authorization');  

    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = userVerified;  
        return res.send({isValid:true});
    } catch (error) {
        return res.status(401).send('Invalid or expired token');
    }
};