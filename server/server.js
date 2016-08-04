import express from 'express';
import configExpress from './config/configExpress';
import configRoutes from './config/configRoutes';

const app = express();

configExpress(app);
configRoutes(app);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
