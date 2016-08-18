import { ServerHealth, NodeServer } from '../../db/db';
import { handleError } from '../../config/utils';
import request from 'request';

const serverHealthController = {

  // Create entries recording server health for each server - accepts /POST request from loadBalancer
  createServerHealth: (req, res) => {
    // assumes req.body is {testId: 2, serverHealths: [{ip: '1.23.23', memory: 34, CPU: 423, available: true}, {etc}]}
    const serverHealthData = req.body.serverHealths;
    const testId = req.body.testId;

    // create an array of create objects to pass into bulkCreate
    const serverHealthArray = serverHealthData.map(serverHealth => {
      let ip = serverHealth.ip;

      return NodeServer.findOne({where: {ip: ip}})
        .then(server => {
          return {
            memory: serverHealthData.memory,
            CPU: serverHealthData.CPU,
            available: serverHealthData.available,
            serverId: server.id,
            testId: testId
          };
        });
    });

    console.log('ServerHealth Array', serverHealthArray);

    ServerHealth.bulkCreate(serverHealthArray)
      .then(() => User.findAll())
      .then(serverHealths => console.log(serverHealths))
      .catch(err => handleError(err));
  }
};

export default serverHealthController;
