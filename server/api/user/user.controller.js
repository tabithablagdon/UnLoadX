import { User, LoadBalancer } from '../../db/db';
import { handleError } from '../../config/utils';
import loadBalancerController from '../loadbalancer/loadbalancer.controller';
import request from 'request';
import { get200fromLB } from '../../config/LB_Ready.js';

const userController = {

  // Creates a new User upon sign-up/sign-in
  createUser: (req, res) => {
    // Checks to see if user has a load balancer
      // if not, create a load balancer and udpate user with LB id
    console.log('createUser body', req.body);

    const authUserId = req.body.authUserId;
    const name = req.body.name;
    const email = req.body.email;
    let lbip;
    let lbuser;

    User.findOne({where: {authUserId: authUserId}})
      .then(user => {
        if (user) {
          console.log(`found user ${JSON.stringify(user)}`);
          res.json(user);
        } else {
          // If user does not exist, create a new loadBalancer instance, record to db, and then create a new user with a FK to that loadbalancer instance
          console.log(`Did not find user of authId ${authUserId}`);
          loadBalancerController.createLoadBalancer()
            .then(ip => {
              // invoke James' function to figure out when docker is up and running
              // loadBalancerController.getLoadBalancerReadyStatus
              console.log(`ip from lb ec2 creation: ${ip}`)
              lbip = ip;
              return LoadBalancer.create({
                ip: ip
              })
            })
            .then(loadBalancer => {
              const loadBalancerId = loadBalancer.dataValues.id;
              console.log('loadbal after create ID', loadBalancer.dataValues.id);
              User.create({
                name: name,
                email: email,
                authUserId: authUserId,
                loadbalancerId: loadBalancerId
              });
            })
            // add a promise here that won't resolve until the LB instance proves docker is ready
            .then(user => {
              lbuser = user;
              return get200fromLB(lbip)
            })
            .then(() => {
              return lbuser;
            })
            .then(user => res.json(user))
            .catch(err => console.log(`Error in user/loadbalancer creation promise chain: ${err}`));
        }
      })
      .catch(err => handleError(err));
  },

  // Returns User and LoadBalancer record attached to the User for Siege Service to access LoadBalancer IP
  getUser: (req, res) => {
    const id = req.params.id;

    User.findOne({where: {id: id}, include: [LoadBalancer]})
      .then(user => res.json(user))
      .catch(err => console.error(err.message));
  }
};

export default userController;
