import express from 'express';
import { createBuilding, readBuildings, getBuildingById, updateBuilding, deleteBuilding } from '../controllers/buildingController.js';
import { verifyTokenApp } from '../middleware/index.js';

const buildingRoutes = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, Accept'
    );
    next();
  });

  const router = express.Router();

  //router.use(verifyTokenApp);  

  router.post('/', createBuilding);
  router.get('/', readBuildings);
  router.get('/:id', getBuildingById);
  router.put('/:id', updateBuilding);
  router.delete('/:id', deleteBuilding);

  app.use('/oapi/building', router);
};

export default buildingRoutes;
