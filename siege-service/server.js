import express from 'express';
import SiegeController from './siege.controller';
import SiegeService from './siege.service';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// handles /POST request from Load Balancer
app.post('/siege', SiegeController.startSiege);

// start siege service on PORT 4000
app.listen(4000, () => {
  console.log('Siege Service listening on port 4000');
});

export default app;
