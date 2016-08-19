import express from 'express';
import serverHealthController from './server-health.controller';


const serverHealthRouter = express.Router();

serverHealthRouter.post('/', serverHealthController.createServerHealth);
serverHealthRouter.get('/', serverHealthController.getServerHealth);
serverHealthRouter.get('/:id', serverHealthController.getTestServerHealth);

export default serverHealthRouter;
