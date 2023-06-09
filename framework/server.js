'use strict';
import Framework from '../framework/framework.js';
import Routes from '../server/routes.js';

class Server {
  
  static init() {
    
    console.log('=============================================================');
    console.log('Starting server');
    console.log('=============================================================');
    
    Framework.setGlobalsVariables();
    let app = Routes.init();
    
    
    process.env.PORT = process.env.PORT || 3000;
    app.listen(process.env.PORT, () => {
      console.log('Server started')
    });
  }
  
}

export default Server;