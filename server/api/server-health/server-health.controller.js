import { ServerHealth, NodeServer } from '../../db/db';
import { handleError } from '../../config/utils';
import request from 'request';

const serverHealthController = {

  // Create entries recording server health for each server - accepts /POST request from loadBalancer
  createServerHealth: (req, res) => {
    // assumes req.body is {testId: 2, serverHealths: [{ip: '1.23.23', memory: 34, CPU: 423, available: true}, {etc}]}
    const serverHealthData = req.body.ServerHealths;
    const testId = req.body.TestId;
    res.sendStatus(200);
    // create an array of create objects to pass into bulkCreate
    const serverHealthArray = serverHealthData.map(serverHealth => {
      let ip = serverHealth.Address;
      return NodeServer.findOne({where: {ip: ip}})
        .then(server => {
          return {
            memory: serverHealth.Mem,
            CPU: serverHealth.Cpu,
            available: serverHealth.Avail,
            serverId: server.id,
            testId: testId
          };
        });
    })
    const serverHealths = Promise.all(serverHealthArray);
    serverHealths
      .then(data => ServerHealth.bulkCreate(data))
      .catch(err => console.log(`some error: ${err}`))
  },

  getServerHealth: (req, res) => {
    const id = req.params.id;
    ServerHealth.findAll()
      .then(health => {
        console.log(health);
        res.json(health);
      });
  },

  getTestServerHealth: (req, res) => {
    const id = req.params.id;
    ServerHealth.findAll({where: {testId: 4}, include: [NodeServer]})
      .then(serverHealthData => {
        res.json(serverHealthData);
      });
  }

};



export default serverHealthController;
