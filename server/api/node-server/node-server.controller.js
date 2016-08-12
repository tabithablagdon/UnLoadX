import { NodeServer, Test, User } from '../../db/db';
import { handleError } from '../../config/utils';
import request from 'request';

const nodeController = {};

/**
 * function createServerNode
 * Creates a new entry into the NodeServer table for each IP/Port entered
 * Creates an entry into Test table
 */

/**
 * Assumes request.body data structure is:
 * {
 *   servers: [
 *     {ip: '12.5.235.2', port: '80', application_type: 'image processor'},
 *     {ip: '12.5.100.2', port: '30', application_type: 'web server'},
 *     {ip: '127.2.232.1', port: '8080', application_type: 'image processor'}
 *   ],
 *   volume: 100
 * }
 */

 nodeController.createServerNodeSocket = (post) => {
   const servers = post.servers;

   //TO ADD: Query for UserId, when authentication is added

   servers.forEach(server => {
     NodeServer.create({
       ip: server.ip,
       port: server.port,
       application_type: server.application_type || 'web server'
     })
     .catch(err => console.error(`Error createServerNodeSocket ${err}`));
   });

   // Create record in Test Table
   Test.create({
     volume: post.volume
   })
   .then(data => {
     // Create data structure to send to Load Balancer Service
     const dataForLB = {
       servers: servers,
       volume: data.dataValues.volume || post.volume,
       testId: data.dataValues.id
     };

     // Send /POST request to Load Balancer
     nodeController.sendTestToLB(dataForLB);
   })
   .catch(err => console.error(err));

 };



nodeController.createServerNode = (req, res) => {
  const servers = req.body.servers;

  //TO ADD: Query for UserId, when authentication is added

  servers.forEach(server => {
    NodeServer.create({
      ip: server.ip,
      port: server.port,
      application_type: server.application_type || 'web server'
    })
    .catch(handleError(res));
  });

  // Create record in Test Table
  Test.create({
    volume: req.body.volume
  })
  .then(data => {
    // Create data structure to send to Load Balancer Service
    const dataForLB = {
      servers: servers,
      volume: data.dataValues.volume || req.body.volume,
      testId: data.dataValues.id
    };

    // Send /POST request to Load Balancer
    console.log('form for LB : ', dataForLB);
    nodeController.sendTestToLB(dataForLB);
  })
  .catch(handleError(res));

  res.send('Test and Servers posted to databases');
};

/**
 * function getServers
 * Retrieves all servers in the database
 */

nodeController.getServers = (req, res) => {

  NodeServer.findAll()
    .then(servers => res.json(servers))
    .catch(handleError(res));

};

/**
 * function postToLB
 * Sends loadBalancer all servers in the database
 */

nodeController.sendTestToLB = (res) => {

  request({
    url: 'http://52.8.16.173:9000/iptables',
    method: 'POST',
    body: JSON.stringify(res)
  }, (err, res, body) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.statusCode, body);
    }
  });

};

export default nodeController;
