import { User, LoadBalancer } from '../../db/db';
import { handleError } from '../../config/utils';
import { loadBalancerController } from '../loadBalancer/loadBalancer.controller';
import request from 'request';

const userController = {

  // Creates a new User upon sign-up/sign-in
  createUser: (req, res) => {
    // Checks to see if user has a load balancer
      // if not, create a load balancer and udpate user with LB id
    console.log('createUser body', req.body);

    const authUserId = req.body.authUserId;
    const name = req.body.name;
    const email = req.body.email;

    User.findOne({where: {authUserId: authUserId}})
      .then(user => {
        if (user) {
          console.log(`found user ${JSON.stringify(user)}`);
          res.json(user);
        } else {
          // If user does not exist, create a new loadBalancer instance, record to db, and then create a new user with a FK to that loadbalancer instance
          console.log(`Did not find user of authId ${authUserId}`);

          // *** TO FIX: Replace hard coded IP.  Pull IP for LB instance using node_processes
          LoadBalancer.create({
            ip: '52.8.16.173:9000'
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
          });
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
