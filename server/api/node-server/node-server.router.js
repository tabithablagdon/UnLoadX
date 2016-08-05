import express from 'express';
import nodeController from './node-server.controller';

const nodeRouter = express.Router();

nodeRouter.post('/', nodeController.sendIP);


export default nodeRouter;
