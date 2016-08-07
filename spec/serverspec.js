const expect = require('chai').expect;
const mocha = require('mocha');
const chai = require('chai');
const request = require('request');
const chaiHttp = require('chai-http');
const should = chai.should();

const app = require('../server/server');

chai.use(chaiHttp);

describe('API Tests', () => {

  describe('/GET api/nodeserver', () => {

    it('should retrieve nodeServer data', (done) => {
      chai.request(app)
      .get('/api/nodeserver')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
    });
  });



});


// app.use('/api/nodeserver', nodeRouter);
// app.use('/api/test', testRouter);
// app.use('/api/request', requestRouter);
