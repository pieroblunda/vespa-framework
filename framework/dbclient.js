import MongoClient from 'mongodb';

class DbClient {
  
  db;
  
  static connect() {
    const url = 'mongodb://localhost:27017';
    
    return new Promise( (resolve, reject) => {
      MongoClient.connect(url, {useNewUrlParser:true}, (err, client) => {
        if(err) {
          reject('Unable to connet to DB')
        }
        
        this.db = client.db(process.env.DB_NAME);
        console.log('Connected successfully!!!');
        resolve();
      });
    });
  }
  
  /* @ToDo: Esto es un parche porque no se exportar DbClient.db */
  static collection(collectionName) {
    return this.db.collection(collectionName);
  }
}

export default DbClient;
