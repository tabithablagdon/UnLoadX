import express from 'express';
import loadBalancerController from './loadbalancer.controller';

const loadBalancerRouter = express.Router();

// loadBalancerRouter.post('/', loadBalancerController.createLoadBalancer);

export default loadBalancerRouter;
