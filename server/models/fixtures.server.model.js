'use strict';
import db from './../../framework/dbclient.js';

class Fixtures {

  static run() {
    // Insert in DB
    db.collection('example').insertOne({
      foo: 'bar',
      date: new Date()
    }); // update
  }

};

export default Fixtures;
