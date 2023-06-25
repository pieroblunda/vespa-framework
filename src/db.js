import DbClient from './dbclient.js';

class DB {
  
  static collection(collectionName) {
    return DbClient.db.collection(collectionName);
  }

}

export default DB;
