import express from 'express';
import nodeController from './node-server.controller';

const nodeRouter = express.Router();

// nodeRouter.post('/', nodeController.createServerNode);

nodeRouter.get('/', nodeController.getServers);

export default nodeRouter;
