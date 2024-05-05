import DbClient from './dbclient.js';
import MongoDB from 'mongodb';

class Crud {
  
  static get currentCollection() {
    return DbClient.db.collection(this.collectionName);
  }
  
  static collection(collectionName) {
    return DbClient.db.collection(collectionName);
  }
  
  /**
  @usage DB.collection().getById(_id)
  @returns Promise: document
  */
  static getById(_id) {
    
    if ( MongoDB.ObjectId.isValid(_id) ) {
      _id = MongoDB.ObjectId(_id);
    } else {
      return Promise.reject(this.parseError(`Invalid _id value: ${_id}`));
    }
    
    let resutlPromise = this.currentCollection.findOne({ _id: _id });
    return this.manageError(resutlPromise);
  }
  
  /**
  @Description finds one documents matching the query. Eq. to DB.findOne(query);
  @usage DB.collection().getOne(partnerCode)
  @returns Promise: document
  */
  static findOne(query) {
    let resutlPromise = this.currentCollection.findOne(query);
    return this.manageError(resutlPromise);
  }
  
  /**
  @usage DB.collection().getByQuery(MongoDB_Query)
  @returns Promise: Array[document]
  */
  static getByQuery(query) {
    let resutlPromise = new Promise( (resolve, reject) => {
      this.currentCollection.find(query).toArray( (err, items) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(items);
      });
    });
    return this.manageError(resutlPromise);
  }
  
  /**
  @Description finds all documents matching the partnerCode
  @usage DB.collection(__collection__).getAll(partnerCode)
  @returns Promise: Array[document]
  */
  static getAll(partnerCode) {
    let query = { partnerCode: partnerCode };
    let resutlPromise = this.getByQuery(query);
    return this.manageError(resutlPromise);
  }

  /**
   * 
   * @Doc https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertMany/
  */
  static insertMany(docs, options) {
    let resutlPromise = this.currentCollection.insertMany(docs, options);
    return this.manageError(resutlPromise);
  }
  
  /**
  @usage DB.collection().updateOne(document)
  @returns Promise: document (inserted document)
  @Description finds the doc._id and update it
  */
  static updateOne(doc){
    
    // Default values
    doc._id = MongoDB.ObjectId(doc._id);
    doc.lastUpdate = new Date();
    
    return new Promise( (resolve, reject) => {
      return this.currentCollection.findOneAndUpdate(
        { _id: doc._id },
        { $set: doc },
        { upsert: true, returnOriginal: false },
        function (error, result) {
          if(error) {
            reject(error);
            return;
          }
          
          resolve(result.value);
        }
      );
    });
  }
  
  static async deleteById(_id) {
    let criteria = { _id: MongoDB.ObjectId(_id) };
    return await this.currentCollection.deleteOne(criteria);
  }
  
  static count(partnerCode) {
    let query = { partnerCode: partnerCode };
    let resutlPromise = this.currentCollection.find(query).count();
    return this.manageError(resutlPromise);
  }
  
  static manageError(currentPromise) {
    let errorParsed;
    return new Promise( (resolve, reject) => {
      currentPromise.then( (result, abc) => {
        resolve(result);
      }).catch( (err) => {
        errorParsed = this.parseError(err);
        reject(errorParsed);
      });
    });
  }
  
  static parseError(err) {
    return err;
  }
  
}

export default Crud;