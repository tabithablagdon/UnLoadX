import express from 'express';
import serverHealthController from './server-health.controller';

const serverHealthRouter = express.Router();

serverHealthRouter.post('/', serverHealthController.createServerHealth);
serverHealthRouter.get('/', serverHealthController.getServerHealth);

export default serverHealthRouter;
