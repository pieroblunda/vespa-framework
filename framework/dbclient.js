import MongoClient from 'mongodb';

class DbClient {
  
  db;
  client;
  
  static async connect2(mongoURI) {
    this.client = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = await this.client.db();
    return this.db;
  }
  
  static connect() {
    let url = 'mongodb://localhost:27017';
    
    if (process.env.CONNECTION_STRING){
      url = process.env.CONNECTION_STRING;
    }
    
    return new Promise( (resolve, reject) => {
      MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology: true}, (err, client) => {
        if(err) {
          reject('Unable to connet to DB');
          return;
        }
        
        this.db = client.db(process.env.DB_NAME);
        this.client = client;
        
        if(process.env.NODE_ENV === 'development'){
          console.log('Connected successfully!!!');
        }
        
        resolve();
      });
    });
  }
  
  static closeConnection() {
    return this.client.close();
  }
  
  /* @ToDo: Esto es un parche porque no se exportar DbClient.db */
  static collection(collectionName) {
    return this.db.collection(collectionName);
  }
}

export default DbClient;
