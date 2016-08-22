import fs from 'fs';
import Promise from 'bluebird';
import request from 'request';

const LB_Ready = {};

LB_Ready.parseLBPublicIPAddress = (filename) => {

  console.log(`parsing LB_IP`);
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        console.log(`Error reading file ${err.message}`);
        reject(err);
      } else {
        console.log('data',data);
        let dataArray = data.toString().replace(/ /g,'').split('\n');
        let parsedPublicIP = dataArray[1].slice(2).slice(0,-1);
        console.log('inArray1', parsedPublicIP);
        resolve(parsedPublicIP);
      }
    });
  });

};

LB_Ready.get200fromLB = (parsedPublicIP, TBDRestEndPoint) => {

  return new Promise((resolve, reject) => {
    request({
      url: `http://${parsedPublicIP}:80${TBDRestEndPoint}`,
      method: 'GET'
    }, (err, res, body) => {
      if (err) {
        console.log(`Error in get200fromLB ${err.message}`);
        reject(err);
      } else {
        console.log(`${res.statusCode} received from LB: ${JSON.stringify(body)}`);
        if(`${res.statusCode}` === '200') {
          resolve(parsedPublicIP);
        } else {
          resolve(null);
        }
      }
    });
  });
  
};

export default LB_Ready;
//instance
//  [
//    "54.193.54.140"
// ]

//LB
//  [
//    "52.8.16.173"
// ]
// node script:
//     • read the file using fs (DONE)
//     • extract the ip address (DONE)
//     • every second, send HTTP GET to a TBD rest endpoint at the IP
//     • once we have a 200 response, notify the API server:
// send HTTP POST to API server (endpoint TBD) with the ip
// Add Comment Collapse