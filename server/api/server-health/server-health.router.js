import express from 'express';
import serverHealthController from './server-health.controller';


const serverHealthRouter = express.Router();

serverHealthRouter.post('/', serverHealthController.createServerHealth);

export default serverHealthRouter;
