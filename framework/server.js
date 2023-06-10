'use strict';
import DotEnv from 'dotenv';
import Framework from './framework.js';
import DbClient from './dbclient.js';
import Routes from './routes.js';

class Server {
  
  static async init(addCustomRoutes) {
    console.log('=============================================================');
    console.log('Starting server');
    console.log('=============================================================');
    Framework.createEnvFile();
    DotEnv.config();
    Framework.setGlobalsVariables();
    Routes.init();
    addCustomRoutes();
    
    console.log('Connecting to DB...');
    await DbClient.connect(process.env.CONNECTION_STRING);
    console.log('Server connected to DB');
    
    return new Promise( (resolve, reject) => {
      Routes.app.listen(process.env.PORT, () => {
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