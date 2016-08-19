import fs from 'fs';
import SiegeController from './siege.controller';
import request from 'request';
import Promise from 'bluebird';

const exec = require('child_process').exec;
const SiegeService = {};

/**
 * function runSiege - runs siege test and logs response time for each request in siegelog.txt
 *
 * @param  {[INTEGER]} volume [number of concurrent users]
 */
SiegeService.runSiege = (data) => {
  // Assumes that data coming from siegeController is:  {Volume: 100, testId: 2, userId: 3}
  const volume = data.Volume;
  const testId = data.TestId;
  const userId = data.userId;
  const LB_URL = data.ip;
  const filename = `${__dirname}/siege-logs/siegelog${testId}.txt`;

  return new Promise((resolve, reject) => {
    // Pull LoadBalancerIP from provided UserId to run siege on User's specific IP instance

    console.log(`Step 5: In SiegeService.runSiege - Running siege using command: siege ${LB_URL} -t${volume}S > ${filename} using ${JSON.stringify(data)}`);

    // Runs shell script that starts 'siege utility' and logs test data to a unique txt file differentiated by ID
    exec(`siege ${LB_URL} -t${volume}S > ${filename}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        console.log(`stdout: ${stdout}, stderr: ${stderr}`);
        reject(err);
      }

      return SiegeService.parseSiegeLog(filename, testId)
      .then(parsedLogs => {
        console.log('[STEP 5.5]: Siege complete!  Starting parseSiegeLog.  Output: ', parsedLogs);

        resolve(parsedLogs);
      });
    });

  });
}

/**
 * function parseSiegeLog parses text log into a usable data structure - an array of objects
 * @param  {[STRING]} filename [path to the log text file]
 * @return {[ARRAY]}          [{ statusCode: '200', latency: '0.00', size: '862', method: 'GET' }, { statusCode: '200', latency: '0.00', size: '862', method: 'GET' } ]
 *
 */
SiegeService.parseSiegeLog = (filename, testId) => {

  console.log(`[STEP 6]: Siege complete.  In SiegeService.parseSiegeLog parsing ${filename}`);

  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        console.log(`Error reading file ${err.message}`);
        reject(err);
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

        const requestBody = {
          requests: parsedDataArray,
          testId: testId
        };

        console.log(`[STEP 6.5] ${filename} has been read and parsed!  Sending back to SiegeService.runSiege requestBody ${requestBody}...`);
        console.log(requestBody);

        resolve(requestBody);
      }
    });
  });

}

export default SiegeService;
