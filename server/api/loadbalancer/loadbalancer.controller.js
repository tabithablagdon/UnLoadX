import { LoadBalancer } from '../../db/db';
import { handleError } from '../../config/utils';
import request from 'request';
import Promise from 'bluebird';
import fs from 'fs';

const exec = require('child_process').exec;

const loadBalancerController = {

  logLoadBalancer: (ip) => {
    console.log(`Creating load balancer with ip ${ip}`);
    return LoadBalancer.create({
      ip: ip
    });
  },

  createLoadBalancer: () => {

    return new Promise((resolve, reject) => {

      exec('. ./startEC2.sh', (err, stdout, stderr) => {
        if (err) {
          console.log(err, stdout, stderr);
          reject(err);
        } else {
          console.log('got stdout from shell script: ', stdout);

        }
      });

    });
  }

};

export default loadBalancerController;
