import express from 'express';
import SiegeController from './siege.controller';

const siegeRouter = express.Router();

// handles /POST request from Load Balancer
siegeRouter.post('/', SiegeController.startSiege);

export default siegeRouter;
