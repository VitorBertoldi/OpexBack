import express from 'express';
import {
  createUser,
  login
} from '../controllers/userController.js';
import { verifyTokenApp } from '../middleware/index.js';

const userRoutes = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, Accept'
    );
    next();
  });

  const router = express.Router();

  router.post('/signup', createUser);
  router.post('/signin', login);

  app.use('/oapi', router);
};

export default userRoutes;
