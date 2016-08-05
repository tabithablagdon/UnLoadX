import express from 'express';
import requestController from './request.controller';

const requestRouter = express.Router();

requestRouter.get('/', requestController.getTestRequests);
requestRouter.post('/', requestController.createRequest);

export default requestRouter;
