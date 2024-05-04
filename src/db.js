import DbClient from './dbclient.js';

class DB {
  
  static get dbName() {
    return DbClient.db.databaseName;
  }

  static getStats() {
    return DbClient.db.stats();
  }

  static collection(collectionName) {
    return DbClient.db.collection(collectionName);
  }

}

export default DB;
