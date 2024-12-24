import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());

userRoutes(app);
authRoutes(app);

export default app;
