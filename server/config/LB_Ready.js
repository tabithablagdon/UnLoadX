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
      let attempt = 0;
      const httpRecursion = attempt => {
        request(options, (err, resp, body) => {
          if (err) {
            console.log('err')
            if (attempt < 60) {
              console.log(`not yet, attempt ${attempt}`)
              httpRecursion(++attempt);
            } else {
              console.log('60 attempts, done')
              reject(err);
            }
          } else {
            console.log('success?')
            resolve();
          }
        });
      }
      httpRecursion(attempt);
    });
  }
  return checkEc2Avail()
    .then(() => console.log('it worked!'))
    .catch(err => console.log(`${err}`))
}

module.exports = LB_Ready;
