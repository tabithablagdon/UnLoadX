import fs from 'fs';
import Promise from 'bluebird';
import request from 'request';
import async from 'async';

// const filename = './dummyArraydata.txt';
// const TBDRestEndPoint = '/';

const LB_Ready = {};
const exec = require('child_process').exec;


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
  console.log(`getting 200 Status from LB`);
  return new Promise((resolve, reject) => {
    let path = `http://${parsedPublicIP}:3000${TBDRestEndPoint}`
    exec(`curl ${path}`, (err, res, body) => {
      if (err) {
        console.error(`exec error: ${err}`);
        console.log(`res: ${res}, body: ${body}`);
        reject(err);
      }
      if (body) {
        console.log('body', body);
        console.log('path', path)
        resolve(path);
      }
    });
 
  });

};

LB_Ready.sendIPToAPIServer = (LB_IP) => {
  console.log(`sending LB IP to API Server`);
  return new Promise((resolve, reject) => {
    request({
      url: 'http://52.9.136.53:3000',
      method: 'POST',
      body: JSON.stringify(LB_IP)
    }, (err, res, body) => {
      if (err) {
        console.log(`Error in send sendIPToAPIServer ${err.message}`);
        reject(err);
      } else {
        console.log(`Sent LB_IP to API Server successfully` );
        resolve(LB_IP);
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