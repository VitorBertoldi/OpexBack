import express from 'express';
import {
  createUser,
  readUsers,
  getUserById,
  updateUser,
  deleteUser,
  login
} from '../controllers/userController.js';
import { verifyTokenApp } from '../controllers/authController.js';

const userRoutes = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-token, Origin, Content-Type, Accept'
    );
    next();
  });

  const router = express.Router();

  router.post('/', createUser);   
  router.post('/login', login);   

  router.use(verifyTokenApp);  

  router.get('/', readUsers); 
  router.get('/:id', getUserById); 
  router.put('/:id', updateUser);  
  router.delete('/:id', deleteUser);  

  app.use('/api/admin/users', router);
};

export default userRoutes;
