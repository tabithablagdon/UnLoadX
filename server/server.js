import express from 'express';
import configExpress from './config/configExpress';
import configRoutes from './config/configRoutes';
import db from './db/db';

const app = express();

configExpress(app);
configRoutes(app);

db.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
  })
  .catch(err => console.log(`Error loading server ${err}`));
