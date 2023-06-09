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
    
    return new Promise( (resolve, reject) => {
      app.listen(process.env.PORT, () => {
        console.log('Server started');
        this.onAfterStart();
        resolve(this);
      });
    });
  }
  
  static async onAfterStart() {
    // Print Todo
    if (process.env.NODE_ENV === 'development') {
      let TodoCli = await import('technical-debt-cli'); // Dynamic import
      TodoCli = TodoCli.default;
      TodoCli.init({
        target: ['client/**/*.{js,styl}', 'server/**/*.js'],
        verbose: false
      });
    }
  }
  
  
}

export default Server;