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

  // spins up a new load balancer, passing a string containing the IP address
  // to the resolving function
  createLoadBalancer: () => {
    return new Promise((resolve, reject) => {
      const dir = __dirname;
      exec('bash ' + dir + '/startEC2.sh', (err, stdout, stderr) => {
        if (err) {
          console.log(err, stdout, stderr);
          reject(err);
        } else {
          console.log('finished ec2 script, got', stdout)
          resolve(stdout.split('"')[1]);
        }
      });
    });
  },


  // sends get requests to the new LB until a 200 response is received, indicating
  // docker is running and that it is safe to start siege
  getLoadBalancerReadyStatus: () => {
    // call James' functions.


    // then indicate it is safe to start siege
  }
};

export default loadBalancerController;
