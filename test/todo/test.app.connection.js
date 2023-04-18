// //Environment variables
process.env.NODE_ENV = 'testing';

//Requirements
var expect = require('expect.js'),
    request = require('request'),
    server = require('../server');

//Global variables


describe('Mocha is start up the testing server', function(){
    
    before(function(){
      server.init();
    });
    
    it('Server starts correctly', function(done){
      
      this.timeout(3500);
      setTimeout(function () {
        request('http://localhost:3001', function (err, response, body) {
          expect(response.statusCode).to.be(200);
          done();
        });
      }, 1500);
    });
    
});