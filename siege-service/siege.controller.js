import { Request } from '../server/db/db';
import { handleError } from '../server/config/utils';
import SiegeService from './siege.service';
import requestController from '../server/request.controller';

const SiegeController = {};

SiegeController.startSiege = (req, res) => {
  // Assumes that req.body coming from Load Balancer is: [ {Volume: 100, testId: 2}
  let body = '';

   req.on('data', function(chunk) {
     body += chunk;
   });

   req.on('end', function() {
     var msg = JSON.parse(body);
     console.log('chunked parsed msg from buffer data: ', msg);
     SiegeService.runSiege(msg);
     res.writeHead(201)
     res.end();
   });
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
