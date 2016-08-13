import express from 'express';
import SiegeController from './siege.controller';
import SiegeService from './siege.service';
import bodyParser from 'body-parser';

import SiegeRouter from './router';

const app = express();

// Insert Express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set routes
app.use('/siege', SiegeRouter);
app.get('/', (req, res) => {
  res.send('BOOM!  The Siege Service is running...');
});

// start siege service on PORT 4000
app.listen(4000, () => {
  console.log('Siege Service listening on port 4000');
  //SiegeService.runSiege({'Volume': 5, 'TestId': 2});
});

export default app;
