'use strict';
import Express from 'express';
import Cors from 'cors';
import BodyParser from 'body-parser';
import CompileStylusMiddleware from '../server/middlewares/compile-stylus.js';
import * as DashboardController from '../server/controllers/dashboard.server.controller.js';


class Routes {
  
  static init() {
    let app = this.config(Express());
    
    
    app.get('/',
    CompileStylusMiddleware,
    DashboardController.renderDashboard);
    
    // Any other case
    app.use(this.defaultRoute);
    
    return app;
  }
  
  static config(app) {
    // App Config
    app.set('json spaces', 0);
    app.set('view engine', 'pug');
    app.set('views', global.VIEWS_PATH);
    
    // Pretty HTML on dev env
    app.locals.pretty = process.env.NODE_ENV === 'development';
    
    app.use(BodyParser.json());
    app.use(Cors());
    
    // Routes config
    app.use('/api/', Express.json());
    app.use('/public', Express.static(global.BASE_PATH + '/public'));

    app.use(this.errorHandler);
    
    return app;  
  }
  
  static errorHandler (error, req, res, next) {
    console.log('errorHandler');
    return res.status(500).json({
      error: error.toString()
    });
  }
  
  static defaultRoute (req, res) {
    res.render('block-404', {
      isErrorPage: true
    });
  }
  
}

export default Routes;
