import MongoClient from 'mongodb';

class DbClient {
  
  db;
  client;
  
  /* @ToDo: [1] This is a connection for MongoDb 3.6 client  */
  static async connect(mongoURI) {
    let dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    if(!mongoURI) {
      return Promise.resolve();
    }
    
    try {
      this.client = await MongoClient.connect(mongoURI, dbOptions);
    } catch (e) {
      console.log(e);
      console.log('DB connection error');
      return Promise.reject('Unable to connet to DB');
    }
    
    this.db = await this.client.db();
    return this.db;
  }
  
  /* @ToDo: [1] Es mejor eliminar esto  */
  static collection(collectionName) {
    return this.db.collection(collectionName);
  }
  
  static closeConnection() {
    return this.client.close();
  }
  
}

export default DbClient;
