import express from 'express';
import { createOrcamentoValues, consultaOrcamento } from '../controllers/orcamentoValues.controller.js';

const orcamentoValuesRoutes = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-token, Origin, Content-Type, Accept, Authorization, authorization'
    );
    next();
  });

  const router = express.Router();
  //router.use(verifyTokenApp);
  
  router.post('/', createOrcamentoValues);
  router.get('/consultaOrcamento', consultaOrcamento);

  app.use('/api/orcamento-values', router);
};

export default orcamentoValuesRoutes;
