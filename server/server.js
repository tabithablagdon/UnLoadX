import express from 'express';
import configExpress from './config/configExpress';
import configRoutes from './config/configRoutes';
import db from './db/db';

import nodeController from './api/node-server/node-server.controller';

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

configExpress(app);
configRoutes(app);

io.on('connection', (socket) => {
  console.log('A socket has been connected!!!!');

  socket.on('disconnect', () => console.log('User disconnected'));

  socket.on('receive-post', (requests) => {
    // io.emit('request', requests)
    console.log('Recieve POST from client socket!', requests);
    nodeController.createServerNodeSocket(requests);
  });

});


db.sync()
  .then(() => {
    http.listen(3000, () => console.log('Listening on *:3000 with socket.io'));
  })
  .catch(err => console.log(`Error loading server ${err}`));

export default app;
