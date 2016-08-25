'use strict'
const request = require('request');

const LB_Ready = {};

LB_Ready.get200fromLB = (parsedPublicIP) => {

  const options = {
    timeout: 5000,
    uri: `http://${parsedPublicIP}:9000/`,
  }

  function checkEc2Avail() {
    console.log('inec2avail')
    return new Promise((resolve, reject) => {
      let startTime = new Date()
      const httpRecursion = start => {
        request(options, (err, resp, body) => {
          if (err) {
            console.log('err')
            // try for 10 minutes
            if ((new Date() - start) / 1000 < 600) {
              console.log(`not yet, time ${((new Date() - start) / 1000) < 600}`)
              httpRecursion(start);
            } else {
              console.log('times up, done')
              reject(err);
            }
          } else {
            console.log('success?')
            resolve();
          }
        });
      }
      httpRecursion(startTime);
    });
  }
  return checkEc2Avail()
    .then(() => console.log('it worked!'))
    .catch(err => console.log(`${err}`))
}

module.exports = LB_Ready;
