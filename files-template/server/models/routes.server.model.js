import {Routes} from 'vespa-framework';

import * as exampleController from '../controllers/example.server.controller.js';
// import * as exampleMiddleware from '../middlewares/example.server.middleware.js';

class MyRoutes {
  
  static addCustomRoutes() {
    let app = Routes.app;
    
    app.get('/', exampleController.renderHome);
  
  }
  
}

export default MyRoutes;
