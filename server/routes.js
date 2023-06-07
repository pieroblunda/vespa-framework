'use strict';
import stylus from 'stylus';
import errorHandler from '../server/middlewares/error-handler.js';
import express from 'express';
import bodyParser from 'body-parser';
import Cors from 'cors';
import * as dashboardController from './controllers/dashboard.server.controller.js';
import compileStylusMiddleware from '../server/middlewares/compile-stylus.js';
//- @CLI-routes-ctrlImport

let app = express();

export function init() {
  
  app = config(app);
  
  app.use(bodyParser.json());
  app.use(Cors());
  
  app.get('/',
  compileStylusMiddleware,
  dashboardController.renderDashboard);
  app.get('/dashboard', dashboardController.renderDashboard);
  
  // Any other case
  app.use(
  function(req, res) {
    res.render('block-404', {
      isErrorPage: true
    });
  });
  
  return app;

};

function config(app){
  // App Config
  app.set('view engine', 'pug');
  app.set('views', process.env.VIEWS_PATH);
  app.set('json spaces', 0);
  
  // Pretty HTML on dev env
  app.locals.pretty = process.env.NODE_ENV === 'development' ? true : false;
  
  // Routes config
  app.use('/api/', express.json());
  app.use('/public', express.static(process.env.BASE_PATH + '/public'));
  
  // Para usar los sourcemaps durante el desarrollo
  if (process.env.NODE_ENV === 'development') {
    app.use('/client', express.static(process.env.BASE_PATH + '/client'));
  }

  app.use(errorHandler);
  
  return app;
}
