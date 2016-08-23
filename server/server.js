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
    nodeController.createServerNodeSocket(requests)
      .then(dataFromLB => nodeController.startSiege(dataFromLB)) 
      .then(requestBody => requestController.createRequest(requestBody))
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

// changed this to module.exports because it made the test work
// export default app;
module.exports = app;
