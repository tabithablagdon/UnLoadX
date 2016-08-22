import express from 'express';
import nodeController from './node-server.controller';


const nodeRouter = express.Router();

nodeRouter.get('/', nodeController.getServers);

export default nodeRouter;
