'use strict'
// import fs from 'fs';
// import Promise from 'bluebird';
// import request from 'request';
// import async from 'async';
const fs = require('fs');
const Promise = require('bluebird');
const request = require('request');
const async = require('async');

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
  console.log(`getting 200 Status from LB`);
  return new Promise((resolve, reject) => {
    let path = `http://${parsedPublicIP}:9000${TBDRestEndPoint}/`
    console.log('path: ', path)
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
module.exports = LB_Ready;
// LB_Ready.get200fromLB('127.0.0.1', '/')
