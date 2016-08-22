import express from 'express';
import configExpress from './config/configExpress';
import configRoutes from './config/configRoutes';
import db from './db/db';
import nodeController from './api/node-server/node-server.controller';
import requestController from './api/request/request.controller';

// //
// import LB_Ready from './config/LB_Ready.js';
// import async from 'async';

// //
// import LB_Ready from './config/LB_Ready.js';
// import async from 'async';

// const filename = __dirname + '/config/dummyArraydata.txt';
// const TBDRestEndPoint = '/';
// let LB_IP = '54.153.124.136';


// setInterval(() => {
//     LB_Ready.get200fromLB(LB_IP, TBDRestEndPoint)
//     .then(results => {
//       IP = results;
//       console.log(IP);
//     });
// }, 10000);

// //


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
