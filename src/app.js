import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import buildingRoutes from './routes/buildingRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import tokenRoute from './routes/verifyTokenRoutes.js'
const app = express();

app.use(express.json());

userRoutes(app);
authRoutes(app);
tokenRoute(app);
buildingRoutes(app);
clientRoutes(app);


export default app;
