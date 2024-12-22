import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());

userRoutes(app);

export default app;
