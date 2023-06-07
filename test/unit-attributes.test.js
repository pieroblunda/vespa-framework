import DbClient from '../framework/dbclient.js';
import Test from '../server/models/aaa-test.server.model.js';


beforeAll( async () => {
  
});

describe('Test Model', () => {
  let promise;
  let result;
  
  beforeAll( async () => {
    console.log('>>>> Opening db connection');
    process.env.CONNECTION_STRING = 'mongodb://127.0.0.1:27017/tienda-panel';
    await DbClient.connect();
    
    result = await Test.getById('645025344fae0ec6a6051c4b');
  });
  
  test('Test 1', () => {
    promise = Test.getById('645025344fae0ec6a6051c4b');
    expect(Object(promise).constructor === Promise).toBe(true);
  });
  
  // test('Test 2', () => {
  //   expect(result).toBe(true);
  // });
  
  afterAll( async () => {
    console.log('>>>> Closing db connection');
    await DbClient.closeConnection();
  });

});