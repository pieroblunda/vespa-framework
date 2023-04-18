'use strict';
import Example from './../models/example.server.model.js';
// const Example = require(process.env.SERVER_PATH + '/models/example.server.model');

/**
@jsDoc
@description: Getter function
@params: req - Express request object
@params: res - Express response object
@response: Array with all documents in database
*/
export function getter(req, res) {
  var example = {
    foo: req.body.bar
  };
  Example.getter(example).then(function(result) {
    res.json(result);
  });
};

/**
@jsDoc
@description: FindBy function
@params: req - Express request object
@params: res - Express response object
@response: Array with all documents in database
*/
export function findById(req, res) {
  var example = {
    _id: req.body.bar
  };
  Example.getter(example).then(function(result) {
    res.json(result);
  });
};

/**
@jsDoc
@description: Setter function
@params: req - Express request object
@params: res - Express response object
@response: Json
*/
export function setter(req, res) {
  var example = {
    foo: req.body.foo,
    bar: req.body.bar
  };
  Example.setter(example).then(function(result) {
    res.json(result);
  });
};
