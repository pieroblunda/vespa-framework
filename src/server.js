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
    Framework.watchJs();
    Routes.init();
    addCustomRoutes();
    Routes.app.use(Routes.defaultRoute);

    const { default: VespaOptions } = await import(`${global.BASE_PATH}/vespa-config.json`, { with: { type: 'json' } });

    if(VespaOptions.useSQLite) {
      const SQlite = await import('./sqlite.server.model.js');
      SQlite.default.connect();
    }
    
    /*
    try {
      await DbClient.connect(process.env.CONNECTION_STRING);
      console.log(Colors.green('✓') + ' Connected to DB');
    } catch (e) {
      console.log(e);
    }
    */
    
    return new Promise( (resolve, reject) => {
      Routes.app.listen(process.env.PORT, () => {
        console.log(Colors.green('✓') + ' Server started on port ' + process.env.PORT);
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