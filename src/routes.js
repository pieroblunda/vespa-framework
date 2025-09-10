'use strict';
import Express from 'express';
import Colors from 'colors';
import Cors from 'cors';
import BodyParser from 'body-parser';
import compression from 'compression';
import * as utilsController from './utils.server.controller.js';

class Routes {
  
  static init() {
    let app = Express();
    
    // App Config
    app.set('json spaces', 0);
    app.set('view engine', 'pug');
    app.set('views', global.VIEWS_PATH);
    
    // Pretty HTML on dev env
    // app.locals.pretty = process.env.NODE_ENV === 'development';
    
    // app.use(BodyParser.json());
    app.use(compression({level: 9, memLevel: 9}));
    app.use(BodyParser.json({limit: '50mb'}));
    app.use(Cors());
    
    // Routes config
    app.use('/api/', Express.json());
    app.use('/public', Express.static(global.BASE_PATH + '/public'));

    // Para usar los sourcemaps durante el desarrollo
    if (process.env.NODE_ENV === 'development') {
      app.use('/client', Express.static(global.BASE_PATH + '/client'));
    }

    app.use(this.errorHandler);

    app.get('/releases-notes', utilsController.renderReleasesNotes);
    
    this.app = app;
  }
  
  static errorHandler (error, req, res, next) {
    console.log('errorHandler');
    return res.status(500).json({
      error: error.toString()
    });
  }
  
  static defaultRoute (req, res) {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(Colors.yellow(`!! ROUTE NOT FOUND: ${fullUrl}`));
    res.render('page-404', {
      isErrorPage: true
    });
  }
  
}

export default Routes;