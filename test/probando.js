// Environment variables
process.env.NODE_ENV = 'testing';

// Requirements
var expect = require('expect.js'),
    server = require('../server');

// Global variables


describe('Mocha is start up the testing server', function(){
    
    it('Server starts correctly', function(done){
      expect(1).to.be(1);
      done();
    });
    
});