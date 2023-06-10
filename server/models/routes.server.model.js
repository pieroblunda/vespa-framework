import Routes from './../../framework/routes.js';
import CompileStylusMiddleware from '../middlewares/compile-stylus.js';
import * as DashboardController from '../controllers/dashboard.server.controller.js';

class MyRoutes {
  
  static addCustomRoutes() {
    let app = Routes.app;
    
    app.get('/',
    CompileStylusMiddleware,
    DashboardController.renderDashboard);
  
  }
  
}

export default MyRoutes;
