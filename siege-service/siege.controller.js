import { Request } from '../server/db/db';
import { handleError } from '../server/config/utils';
import { SiegeService } from './siege.service';

const SiegeController = {};

SiegeController.startSiege = (req, res) => {
  // Assumes that req.body coming from Load Balancer is: [ {Volume: 100, testId: 2}
  SiegeService.runSiege(req.body);

};

// Creates a new entry in the Requests table for each request received from the Siege Service

SiegeController.createRequest = (data) => {
  // Assumes data structure is {requests: [[], []], testId: 4}
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
    .catch(handleError(res));

  });

};

export default SiegeController;
