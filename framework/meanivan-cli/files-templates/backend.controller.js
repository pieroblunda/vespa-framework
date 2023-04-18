'use strict';
const MyNewServerModelCapitalized = require(process.env.SERVER_PATH + '/models/MyNewServerModelLowercase.server.model');

/**
@jsDoc
@description: Getter function
@params: req - Express request object
@params: res - Express response object
@response: Json
*/
module.exports.getter = function(req, res) {
  var MyNewServerModelLowercase = {
    foo: req.body.bar
  };
  MyNewServerModelCapitalized.getter(MyNewServerModelLowercase).then(function(result) {
    res.json({ok:1});
  });
};

/**
@jsDoc
@description: Setter function
@params: req - Express request object
@params: res - Express response object
@response: Json
*/
module.exports.setter = function(req, res) {
  var MyNewServerModelLowercase = {
    foo: req.body.bar
  };
  MyNewServerModelCapitalized.setter(MyNewServerModelLowercase).then(function(result) {
    res.json({ok:1});
  });
};
