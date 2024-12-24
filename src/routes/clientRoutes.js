import express from 'express';
import { createClient, readClients, getClientById, updateClient, deleteClient } from '../controllers/clientController.js';

const clientRoutes = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-token, Origin, Content-Type, Accept'
    );
    next();
  });

  const router = express.Router(); 

  router.use(verifyTokenApp);  

  router.post('/', createClient);
  router.get('/', readClients);
  router.get('/:id', getClientById);
  router.put('/:id', updateClient);
  router.delete('/:id', deleteClient);

  app.use('/oapi/client', router);
};

export default clientRoutes;
