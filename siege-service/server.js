import express from 'express';
import SiegeController from './siege.controller';
import SiegeService from './siege.service';
import bodyParser from 'body-parser';

import SiegeRouter from './router';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/siege', SiegeRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// handles /POST request from Load Balancer
// app.post('/siege', (req, res) => {
//   console.log('req.body', req.body);
//
//   SiegeController.startSiegeSocket(req.body);
// });



// start siege service on PORT 4000
app.listen(4000, () => {
  console.log('Siege Service listening on port 4000');
  //SiegeService.runSiege({'Volume': 5, 'TestId': 2});
});

export default app;
