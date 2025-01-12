import express from 'express';
import { readServices } from '../controllers/service.controller.js';

const clientRoutes = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-token, Origin, Content-Type, Accept, Authorization, authorization'
    );
    next();
  });
  const router = express.Router(); 

  //router.use(verifyTokenApp);  

  router.get('/', readServices);

  app.use('/api/services', router);
};

export default clientRoutes;
