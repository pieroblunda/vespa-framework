import { DatabaseSync } from 'node:sqlite';

class Database {

  static sync() {
    return new DatabaseSync(process.env.SQL_DATABASE_PATH);
  }
  
}

export default Database.sync();
