import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import tokenRoute from './routes/verifyTokenRoutes.js'
const app = express();

app.use(express.json());

userRoutes(app);
authRoutes(app);
tokenRoute(app);

export default app;
