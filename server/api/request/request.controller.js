import { Test, NodeServer, Request, ServerHealth } from '../../db/db';
import { handleError } from '../../config/utils';

const requestController = {};


requestController.createRequest = (data) => {
  data = JSON.parse(data);
  const testId = data.testId;
  const requests = data.requests;

  console.log(`[STEP 7]: In requestController.createRequest - posting records to DB - Requests table using data - requests of length ${requests.length} and testId ${testId}`);

  return Promise.all(
    requests.map(request => Request.create({
        statusCode: request.statusCode,
        latency: request.latency,
        method: request.method,
        testId: testId
      })
    ))
    .then(requestData => {
      console.log('[STEP 7.5]: Completed all Request.create records - running parseRequests with resolved requestData');

      let parsedData = requestController.getServerHealth(requestData, testId);

      return parsedData;
    })
    .catch(err => {
       console.log(`Error creating requests ${err.message}`);
     });
};

// function requestController() - retrieves serverhealth information for specific test

requestController.getServerHealth = (requestData, id) => {

  return ServerHealth.findAll({where: {testId: id}, include: [NodeServer]})
    .then(serverHealthData => {

      console.log('[STEP 7.7]: In requestController.getServerHealth - retrieved ServerHealth data', serverHealthData);

      return parseRequests(requestData, serverHealthData);
    });
};

// function parseRequests() - Parses data into data structure needed by Client to visualize on front-end

function parseRequests(data, serverHealthData) {

  console.log(`[STEP 8]: In parseRequests parsing data`);

  const stats = {};
  const len = data.length;
  const latencyArray = data.map(request => Number(request.latency));
  const latencySet = data.map((item, index) => {
  	  return {'x': index, 'y': Number(item.latency)};
    });
  const latencyAvg = latencyArray.reduce((sum, next) => sum + next)/len;
  const latencyMax = Math.max(...latencyArray);
  const latencyMin = Math.min(...latencyArray);
  const latencyStdDevSum = latencyArray.map(latency => {
    return Math.pow(latency - latencyAvg, 2);
  });
  const latencyStdDev = Math.sqrt(latencyStdDevSum.reduce((a, b) => a + b)/len);
  const statusCodesCache = {};
  const status = [];

  // Creates a count of status code responses hash table
  data.forEach(request => {
    if (!statusCodesCache.hasOwnProperty(request.statusCode)) {
      statusCodesCache[request.statusCode] = 1;
    } else {
      statusCodesCache[request.statusCode]++;
    }
  });

  // Parses count of status codes into status summary array
  for (let key in statusCodesCache) {
    status.push({
      'key': key,
      'y': statusCodesCache[key]
    });
  }

  // Create request data structure to be returned to client
  stats.testId = data[0].testId;
  stats.totalReqs = len;
  stats.latency = {
    latencySet: latencySet,
    avg: latencyAvg,
    max: latencyMax,
    min: latencyMin,
    stdDev: latencyStdDev
  };
  stats.status = status;
  stats.serverhealth = serverHealthData;

  console.log('[STEP 8.5]: Finished parsing requests - sending back statsData ', stats);

  return stats;
}

requestController.getAllRequests = (req, res) => {
  Request.findAll()
    .then(requests => res.json(requests))
    .catch(handleError(res));
};

requestController.getTestRequests = (req, res) => {
  const testId = req.params.id || 1;

  Request.findAll({where: {testId: testId}})
    .then(requests => {
      let parsedRequests = parseRequests(requests);
      res.json(parsedRequests);
    })
    .catch(handleError(res));
};

export default requestController;
