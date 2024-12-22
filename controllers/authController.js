import jwt from 'jsonwebtoken';

export const verifyTokenApp = (req, res, next) => {  // Incluindo o parâmetro next
    const token = req.header('authorization-token') || req.header('Authorization');  // Verificando ambos os cabeçalhos, caso o cliente use 'Authorization'

    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        // Verifica o token com a chave secreta
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = userVerified;  // Armazena o usuário verificado no objeto `req`
        next();  // Passa a execução para o próximo middleware ou rota
    } catch (error) {
        return res.status(401).send('Invalid or expired token');
    }
};
