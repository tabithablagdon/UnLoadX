require("babel-register");
// const httpMocks = require('node-mocks-http');

const supertestChai = require('supertest-chai');
const request = supertestChai.request;
const chai = require('chai');
const should = chai.should();
const server = require('../server/server.js');
chai.use(supertestChai.httpAsserts);

const loadbalancerCtrl = require('../server/api/loadbalancer/loadbalancer.controller')
const userCtrl = require('../server/api/user/user.controller')

// import models for direct db manipulation
const User = require('../server/db/db').User;
const LoadBalancer = require('../server/db/db').LoadBalancer;

describe('Environment Setup', function() {
  it('should connect to server', function(done) {
    request(server)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
});
  // it('should connect to the database', function(done) {
  //   request(server)
  //     .get('/')
  //     .end(function(err, res){
  //       res.should.have.status(200);
  //       done();
  //     });
  // });

describe('Users', function() {
  it('should create records for new users', function(done) {
    this.timeout(10000);
    setTimeout(() => {
      // remove records created from previous test
      User.destroy({
        where: {
          name: 'adam test',
        },
      });
      LoadBalancer.destroy({
        where: {
          ip: '123.45.67.89',
        },
      })
      .then(() => {
        // create load balancer and user records in the db to simulate an existing user
        return LoadBalancer.create({
          ip: '123.45.67.89',
        })
      })
      .then(row => {
        console.log(`lb id: ${row.id}`);
        return row.id;
      })
      .then(id => {
        console.log('here is the id', id)
        return User.create({
          name: 'adam test',
          email: 'adam@test.com',
          authUserId: 'testId001',
          loadbalancerId: id,
        })
      })
      .then(() => {
        const body = {
          name: 'adam test',
          authUserId: "testId001",
          email: 'adam@test.com',
        };
        return request(server)
        .post('/api/user')
        .send(body)
        .end(function(err, res){
          res.should.have.status(200);
          res.body.name.should.equal('adam test');
          res.body.authUserId.should.equal('testId001');
          res.body.id.should.be.a('number');
          done();
        });
      })
      .catch(err => console.error(err));

    }, 2000)
  })

//   it('should sign in existing users', function(done) {
//     // first create a test user record in the db
//     User.create({
//       name: 'joe test',
//       email: 'joe@test.com',
//       authUserId: 'testId1234567890',
//       loadbalancerId: 'testlbid'
//     })
//     .then()
//     // then call this sign in function with that data
//     // then delete the test record
//     request(server)
//       .post('/api/user')
//       .end(function(err, res){
//         if (err) { console.log(`Error creating user: ${err}`); }
//         else { console.log(`Response: ${res}`); }
//         res.should.have.status(200);
//         done();
//       });
//   });
});

// CLIENT
// test auth
  // test that signup button posts to correct route
  // test that sign in button posts to correct route
// test form submission
  // test cannot submit until LB is available
  // test that submission button posts to correct route
// test graph view
  // test that clicking button to get data too early does not crash
  // test that clicking button to get data more than once is ok




// SERVER
// test that signing up as a new user creates a user in db and logs them in
  // test that signup function works and writes to db
  // test that create function works and writes to db

// test that creating a user creates a load balancer
  // in ec2
  // in db

// test submitting the form
  // controller function works correctly
    // does not submit if no user logged in
    // does not work if no input
// test receiving post from LB
  // receiving the post triggers controller function to post to siege
// test receiving data from siege
  // writes siege data to DB
  // gives parsed data to client


// LOADBALANCER
// test that Post request works
  // checks the avail status and health of servers
  // responds to client and returns if unavail servers
  // starts LB on 9090 if avail servers
  // responds to the request
  // subsequent post requests (new IPs and test info) overwrite the old values in the ip tables
  // submits POST to API server to start siege
// test health reporting
  // starting the LB initiates get requests for health for n seconds
  // get requests for health return valid responses for all IPs entered
  // does not crash if health cant be retrieved
  // respond to post with average health
// test health strategy
  // evaluates health and makes a choice every second
  // chooses server with best health
// routing
  // does not crash if a server goes down
  // routes traffic to endpoints specified by user

// SIEGE
// is triggered by post from API server
  // starts siege pointed at correct LB IP
  // siege requests result in 200 status codes
  // respond to API server (with siege log?)
