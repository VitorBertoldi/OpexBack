import { verifyToken} from '../middleware/index.js';
import express from 'express';

const tokenRoute = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, Accept'
    );
    next();
  });

  const router = express.Router();

  router.post('/verify-token', verifyToken);

  app.use('/oapi', router);
};

export default tokenRoute;
