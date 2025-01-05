import express from 'express';
import { createClient, readClients, getClientById, updateClient, deleteClient, createClientBuilding } from '../controllers/clientController.js';
import { verifyTokenApp } from '../middleware/index.js';

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

  router.post('/', createClient);
  router.post('/buildings', createClientBuilding);
  router.get('/', readClients);
  router.get('/:id', getClientById);
  router.put('/:id', updateClient);
  router.delete('/:id', deleteClient);

  app.use('/api/client', router);
};

export default clientRoutes;
