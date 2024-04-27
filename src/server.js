'use strict';
import Colors from 'colors';
import Framework from './framework.js';
import DbClient from './dbclient.js';
import Routes from './routes.js';

class Server {

  static test() {
    console.log('It works!');
  }
  
  static async init(addCustomRoutes) {
    console.log('=============================================================');
    console.log('Starting server');
    console.log('=============================================================');
    console.log('Config NODE_ENV:', process.env.NODE_ENV);
    Framework.setupEnvFile();
    Framework.createDirectories();
    Framework.setGlobalsVariables();
    // Framework.compileStyusFramework();
    Framework.compileStylus();
    Framework.watchJs();
    Framework.watchStylus();
    Routes.init();
    addCustomRoutes();
    Routes.app.use(Routes.defaultRoute);
    
    await DbClient.connect(process.env.CONNECTION_STRING);
    console.log(Colors.green('✓') + ' Connected to DB');
    
    return new Promise( (resolve, reject) => {
      Routes.app.listen(process.env.PORT, () => {
        console.log(Colors.green('✓') + ' Server started');
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