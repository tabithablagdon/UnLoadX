import { Request } from '../server/db/db';
import { handleError } from '../server/config/utils';
import SiegeService from './siege.service';
import requestController from '../server/api/request/request.controller';

const SiegeController = {};

SiegeController.startSiegeSocket = (req, res) => {
  // Assumes that req.body coming from Load Balancer is: [ {Volume: 100, testId: 2}
  console.log(`[STEP 4]: Handling /POST request to /siege - in startSiegeSocket with req as ${JSON.stringify(req.body)} - running SiegeService.runSiege...`);

  return SiegeService.runSiege(req.body)
    .then(data => {
      console.log('[Step 6.7]: Received requests data back from SiegeService!', data);
       res.status(201).json(data);
    })
    .catch(err => console.log(`Error sending requests data from SiegeController.startSiege ${err.message}`));
};

// Creates a new entry in the Requests table for each request received from the Siege Service

SiegeController.createRequest = (data) => {
  // Assumes data structure is {requests: [[], []], testId: 4}
  console.log('data in createRequest', data);
  const testId = data.testId;
  const requests = data.requests;

  requests.forEach(request => {

    Request.create({
      statusCode: request.statusCode,
      latency: request.latency,
      method: request.method,
      CPU: null,
      GPU: null,
      memory: null,
      testId: testId
    })
    .catch(err => console.log(err));

  });
  //
  requestController.getTestRequestsSocket(testId);
};

export default SiegeController;
