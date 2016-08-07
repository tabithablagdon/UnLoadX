import { NodeServer, Test, User } from '../../db/db';
import { handleError } from '../../config/utils';

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

nodeController.createServerNode = (req, res) => {
  const servers = req.body.servers;
  console.log('servers', servers);
  console.log('req.body', req.body)

  //TO ADD: Query for UserId, when authentication is added

  servers.forEach(server => {
    console.log('server here', server);
    NodeServer.create({
      ip: server.ip,
      port: server.port,
      application_type: server.application_type || 'web server'
    })
    .catch(handleError(res));
  });

  Test.create({
    volume: req.body.volume
  })
  .catch(handleError(res));

  res.send(req.body);

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

export default nodeController;
