import { User, LoadBalancer } from '../../db/db';
import { handleError } from '../../config/utils';
import { loadBalancerController } from '../loadBalancer/loadBalancer.controller';
import request from 'request';

const userController = {

  // Creates a new User upon sign-up/sign-in
  createUser: (req, res) => {
    // Checks to see if user has a load balancer
      // if not, create a load balancer and udpate user with LB id
    const authUserId = req.body.authUserId;
    const name = req.body.name;
    const email = req.body.email;

    User.findOne({where: {authUserId: authUserId}})
      .then(user => {
        if (user) {
          res.json(user);
        } else {
          // If user does not exist, create a new loadBalancer instance, record to db, and then create a new user with a FK to that loadbalancer instance

          // *** TO FIX: Replace hard coded IP.  Pull IP for LB instance using node_processes
          loadBalancerController.createLoadBalancer('1.25.234')
            .then(loadBalancer => {
              User.create({
                name: name,
                email: email,
                authUserId: authUserId,
                loadBalancerId: loadBalancer.dataValues.id
              });
            })
            .catch(err => console.err(error.message));
        }
      })
      .catch(err => handleError(err));
  },

  // Returns User and LoadBalancer record attached to the User for Client to access IP
  getUser: (req, res) => {
    const authUserId = req.params.id;

    User.findOne({where: {authUserId: authUserId}, include: [LoadBalancer]})
      .then(user => res.json(user))
      .catch(err => console.error(err.message));
  }
};

export default userController;
