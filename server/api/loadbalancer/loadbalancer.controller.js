import { LoadBalancer } from '../../db/db';
import { handleError } from '../../config/utils';
import request from 'request';
import Promise from 'bluebird';

const loadBalancerController = {
  createLoadBalancer: (req, res) => {
    LoadBalancer.create(req.body);
  }
};

export default loadBalancerController;
