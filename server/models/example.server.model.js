'use strict';
import db from './../../framework/dbclient.js';

class Example {
    
  static getter(inputObj){
    /* @ToDo: List only explicit doc attributes */
    /* @ToDo: Add support for pagination */
    return new Promise( (resolve, reject) => {
      db.collection('example').find({}).toArray(function(err, items) {
        if (err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  } // getter()

  static findById(id){
    return db.get().collection('example').findOne({
      _id: id
    });
  } // findById()

  static setter(inputObj){
    return new Promise(function(resolve, reject) {
      db.collection('example').insertOne(inputObj, function (error, response) {
        if(error) {
          reject(error);
        }else{
          resolve(response.ops[0]);
        }
      });
    });
  } // setter()
}

export default Example;
