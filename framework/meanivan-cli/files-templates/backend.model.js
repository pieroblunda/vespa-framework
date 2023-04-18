'use strict';
const db = require(process.env.BASE_PATH + '/framework/dbclient');
const ObjectID = require('mongodb').ObjectID;

const MyNewServerModelCapitalized = function() {

  const model = {
    getter: getter,
    setter: setter
  };

  function getter(inputObj){
    return db.get().collection('MyNewServerModelLowercase').insert({
      foo: inputObj.foo,
      bar: inputObj.bar
    });
  }

  function setter(inputObj){
    return db.get().collection('MyNewServerModelLowercase').update(
    {
      _id: ObjectID(inputObj._id)
    },{
      foo: inputObj.foo,
      bar: inputObj.bar
    },{
      upsert: true
    });

  }

  return model;

};

module.exports = new MyNewServerModelCapitalized();
