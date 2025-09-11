import { DatabaseSync } from 'node:sqlite';

class Database {

  static connect() {
    let dbPath;

    if(!process.env.SQL_DATABASE_PATH && !global.BASE_PATH) {
      console.log('Waiting for coonection...');
      return this;
    }

    dbPath = process.env.SQL_DATABASE_PATH || `${global.BASE_PATH}/database.db`;

    if(!global.DATABASE_CONNECTION) {
      global.DATABASE_CONNECTION = new DatabaseSync(dbPath);
      console.log(`Connected to DB ${dbPath}`);
    }
    
    return global.DATABASE_CONNECTION;
  }
  
}

global.DATABASE_CONNECTION = Database;

export default global.DATABASE_CONNECTION;