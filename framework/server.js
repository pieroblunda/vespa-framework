'use strict';
import Framework from '../framework/framework.js';
import DbClient from './dbclient.js';
import Routes from '../server/routes.js';

class Server {
  
  static async init() {
    
    console.log('=============================================================');
    console.log('Starting server');
    console.log('=============================================================');
    
    Framework.setGlobalsVariables();
    let app = Routes.init();
    
    console.log('Connecting to DB...');
    await DbClient.connect(process.env.CONNECTION_STRING);
    console.log('Server connected to DB');
    
    app.listen(process.env.PORT, () => {
      console.log('Server started')
    });
  }
  
}

export default Server;