import { LoadBalancer } from '../../db/db';
import { handleError } from '../../config/utils';
import request from 'request';
import Promise from 'bluebird';

const loadBalancerController = {

  createLoadBalancer: (ip) => {
    return LoadBalancer.create({
      ip: ip
    });
  }

};

export default loadBalancerController;
