//Requirements
var expect = require('expect.js'),
    request = require('request');

//Global variables
var appURL = 'http://localhost:3001',
    completeURL;

describe('Routes', function(){

  describe('/', function(){
    
    before(function(){
      completeURL = appURL + '/';
    });
    
    it('Expect to have status 200', function(done){
      request(completeURL, function (err, response, body) {
        expect(response.statusCode).to.be(200);
        done();
      });
    });
  
  });
  
  describe('/url-non-exists', function(){
    it('Expect to have status 404', function(done){
      request(appURL + '/url-non-exists', function (err, response, body) {
        expect(response.statusCode).to.be(404);
        done();
      });
    });
  });
  
});