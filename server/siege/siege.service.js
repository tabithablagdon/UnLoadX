// import cmd from 'node-cmd';
// import fs from 'fs';
const cmd = require('node-cmd');
const fs = require('fs');
const SiegeController = require('./siege.controller');
const SiegeService = {};

const LB_URL = 'http://52.8.16.173:9000/iptables';


/**
 * function runSiege - runs siege test and logs response time for each request in siegelog.txt
 *
 * @param  {[INTEGER]} volume [number of concurrent users]
 */
SiegeService.runSiege = (data) => {
  // Assumes that data coming from siegeController is: [volume, testId]
  const volume = data[0];
  const testId = data[1];
  const filename = `log/siegelog${testId}`;

  cmd.get(`siege ${LB_URL} -c${volume} > ${filename}`, data => {
    console.log(`Siege data ${data}`);
    // parse the logFile into an array
    const dataArray = SiegeService.parseSiegeLog(filename);

    const requestBody = {
      requests: dataArray,
      testId: testId
    };
    // sent array back to siegeController to create
    // entry in Requests Table
    SiegeController.createRequest(requestBody);
  });

}

/**
 * function parseSiegeLog parses text log into a usable data structure - an array of objects
 * @param  {[STRING]} filename [path to the log text file]
 * @return {[ARRAY]}          [{ statusCode: '200', latency: '0.00', size: '862', method: 'GET' }, { statusCode: '200', latency: '0.00', size: '862', method: 'GET' } ]
 * 
 */
SiegeService.parseSiegeLog = (filename) => {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading file ${err}`);
    } else {
      let dataArray = data.toString().split('\n');
      let parsedDataArray = [];

      dataArray.forEach(request => {
        let splittedRequest = request.replace(/\s\s+/g, ' ').split(' ');
        // if request object isn't empty, parse and add to parsedDataArray
        if (request.length > 1) {
          parsedDataArray.push({
            'statusCode': splittedRequest[1],
            'latency': splittedRequest[2],
            'size': splittedRequest[4],
            'method': splittedRequest[7]
          });
        }
      });
      return parsedDataArray;
    }
  });
}

// parseSiegeLog('logs/siegelog.txt');

// Path of siege.log (for future reference)
// /usr/local/var/siege.log

export default SiegeService;
