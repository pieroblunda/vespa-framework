import DB from './db.server.model.js';

class Test extends DB {
  
  static get collectionName() {
    return 'attributes';
  }
  
  /**
  @usage Test.getById(_id)
  @returns Promise: document
  @API GET /api/test/getById/645025344fae0ec6a6051c4b
  */
  
  /**
  @usage Test.findOne(query)
  @returns Promise: document
  @API GET /api/test/findOne
  */
  
  /**
  @usage Test.customDbQuery(query)
  @returns Promise: document
  @API GET /api/test/customDbQuery
  */
  static async customDbQuery(query) {
    query = {
      partnerCode: 'devpartner',
      filter: true
    };
    return await DB.collection(this.collectionName).findOne(query);
  }
  
  /**
  @usage Test.getFilters(query)
  @returns Promise: document
  @API GET /api/test/getFilters
  */
  static async getFilters() {
    let query = {
      partnerCode: 'devpartner',
      filter: true
    };
    return this.getByQuery(query);
  }
  
}

export default Test;
