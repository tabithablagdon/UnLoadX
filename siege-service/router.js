import express from 'express';
import SiegeController from './siege.controller';

const SiegeRouter = express.Router();

SiegeRouter.post('/', SiegeController.startSiegeSocket);

export default SiegeRouter;
