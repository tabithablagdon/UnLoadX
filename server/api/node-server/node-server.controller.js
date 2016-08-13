import { NodeServer, Test, User } from '../../db/db';
import { handleError } from '../../config/utils';
import request from 'request';
import Promise from 'bluebird';

const nodeController = {};

/**
 * function createServerNode
 * Creates a new entry into the NodeServer table for each IP/Port entered
 * Creates an entry into Test table
 */

  function createServers(servers) {
    servers.forEach(server => {
      NodeServer.create({
        ip: server.ip,
        port: server.port,
        application_type: server.application_type || 'web server'
      })
      .catch(err => console.error(`Error createServerNodeSocket ${err}`));
    });
  }

 nodeController.createServerNodeSocket = (post) => {
   const servers = post.servers;

   // Create NodeServer REACTIVE_FORM_DIRECTIVES
   createServers(servers);

   // Create record in Test Table
   return Test.create({
     volume: post.volume
   })
   .then(data => {
     // Create data structure to send to Load Balancer Service
     const dataForLB = {
       servers: servers,
       volume: data.dataValues.volume || post.volume,
       testId: data.dataValues.id
     };
     console.log(`Step 1: Finished Test.Create - Calling sendTestToLB and sending ${JSON.stringify(dataForLB)}`);

     // Send /POST request to Load Balancer
     return nodeController.sendTestToLB(dataForLB);
   })
   .catch(err => console.error(err));

 };

/**
 * function postToLB
 * Sends loadBalancer all servers in the database
 */

nodeController.sendTestToLB = (res) => {
  console.log(`Step 2: In sendTestToLB and sending ${JSON.stringify(res)}`);

  return new Promise((resolve, reject) => {
    request({
      url: 'http://52.8.16.173:9000/iptables',
      method: 'POST',
      body: JSON.stringify(res)
    }, (err, res, body) => {
      if (err) {
        console.log(`Error in sendTestToLB ${err.message}`);
        reject(err);
      } else {
        console.log(`Step 2.5: Send Test to LB resolved successfully with ${res.statusCode} and received back body ${JSON.stringify(body)}`);
        resolve(body);
      }
    });
  });
};

nodeController.startSiege = (data) => {
  console.log(`Step 3: Invoked startSiege promise - sending /POST to Siege Service with this data ${JSON.stringify(data)}`);

  // request({
  //   url: 'http://localhost:4000/siege',
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({Volume: '10', TestId: 2})
  // }, (err, res, body) => {
  //   if (err) {
  //     console.log(`Error posting to /siege ${err.message}`);
  //     //reject(err);
  //   } else {
  //     console.log(`Step 3.5 - startSiege /POST to /siege was successful with statusCode ${res.statusCode} posting body ${body}`);
  //     //resolve(body);
  //   }
  // });

  return new Promise((resolve, reject) => {
    request({
      url: 'http://localhost:4000/siege',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }, (err, res, body) => {
      if (err) {
        console.log(`Error posting to /siege ${err.message}`);
        reject(err);
      } else {
        console.log(`Step 3.5 - startSiege /POST to /siege was successful with statusCode ${res.statusCode} posting body ${body}`);
        resolve(body);
      }
    });
  });
};

//
// nodeController.createServerNode = (req, res) => {
//   const servers = req.body.servers;
//
//   //TO ADD: Query for UserId, when authentication is added
//
//   servers.forEach(server => {
//     NodeServer.create({
//       ip: server.ip,
//       port: server.port,
//       application_type: server.application_type || 'web server'
//     })
//     .catch(handleError(res));
//   });
//
//   // Create record in Test Table
//   Test.create({
//     volume: req.body.volume
//   })
//   .then(data => {
//     // Create data structure to send to Load Balancer Service
//     const dataForLB = {
//       servers: servers,
//       volume: data.dataValues.volume || req.body.volume,
//       testId: data.dataValues.id
//     };
//
//     // Send /POST request to Load Balancer
//     console.log('form for LB : ', dataForLB);
//     nodeController.sendTestToLB(dataForLB);
//   })
//   .catch(handleError(res));
//
//   res.send('Test and Servers posted to databases');
// };

/**
 * function getServers
 * Retrieves all servers in the database
 */

nodeController.getServers = (req, res) => {

  NodeServer.findAll()
    .then(servers => res.json(servers))
    .catch(handleError(res));

};


export default nodeController;
