import { Test, NodeServer, Request } from '../../db/db';
import { handleError } from '../../config/utils';

const requestController = {};

requestController.getAllRequests = (req, res) => {
  // TO DO: Get the testId somehow
  const testId = 1; // should populate from params for req.body

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


function parseRequests(data) {
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
      'values': [{
        'label': 'Status Code',
        'value': statusCodesCache[key]
      }]
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

  return stats;

}

export default requestController;
