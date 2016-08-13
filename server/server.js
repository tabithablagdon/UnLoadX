import express from 'express';
import configExpress from './config/configExpress';
import configRoutes from './config/configRoutes';
import db from './db/db';

import nodeController from './api/node-server/node-server.controller';
import requestController from './api/request/request.controller';

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

configExpress(app);
configRoutes(app);

io.on('connection', (socket) => {
  console.log('A socket has been connected!!!!');

  socket.on('disconnect', () => console.log('User disconnected'));

  socket.on('receive-post', (requests) => {
    console.log('Received POST from client socket!', requests);
    
    // var stats = {"testId":1,"totalReqs":460,"latency":{"latencySet":[{"x":0,"y":1},{"x":1,"y":2}], "avg":0.001500000000000001,"max":0.01,"min":0,"stdDev":0.0035707142142714166}, "status":[{"key":"200","values":[{"label":"Status Code","value":460}]}]};
    // socket.emit('receive-requests', stats);

    nodeController.createServerNodeSocket(requests) // returns dataFromLB = {'Volume': 10, 'TestId': 2}
      .then(dataFromLB => nodeController.startSiege(dataFromLB)) // returns requestBody = {requests: parsedDataArray, testId: testId}
      .then(requestBody => requestController.createRequest(requestBody)) // returns statsData  = {testId: 1, totalReqs: 400, latency: {latencySet, avg, max, min, stdDev}, status }-=
      .then(statsData => {
        console.log('[STEP 9]: Received statsData back from requestController - sending back up to client - statsData is: ', statsData);

        socket.emit('receive-requests', statsData);
      })
      .catch(err => console.log(`Error in socket chain ${err.message}`));
  });

});

db.sync()
  .then(() => {
    http.listen(3000, () => console.log('Listening on *:3000 with socket.io'));
  })
  .catch(err => console.log(`Error loading server ${err}`));

export default app;
