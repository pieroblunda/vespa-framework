/* @ToDo: https://expressjs.com/es/advanced/best-practice-performance.html#code */
/* @ToDo: https://blog.cloud66.com/installing-nginx-and-http-2-in-your-local-development-environment/ */
'use strict';
import express from 'express';
// import spdy from 'spdy';
import fs from 'fs';
import colors from 'colors';
import DbClient from './dbclient.js';
import TodoCli from 'technical-debt-cli';
import Fixtures from '../server/models/fixtures.server.model.js';
import * as routes from '../server/routes.js';
import errorHandler from '../server/middlewares/error-handler.js';
import compileStylus from '../server/middlewares/compile-stylus.js';
const app = express();

export function init() {
  console.log('=============================================================');
  console.log('Starting HTTP server');
  console.log('=============================================================');
  
  // Init DB connection
  DbClient.connect().then(function(err){

    /*
    if(err){
      console.log(colors.red('✗') + ' Error on mongodb connection: ', err);
      return false;
    }
    */

    console.log(colors.green('✓') + ' Connected to mongodb succesfully');
    
    // Fixtures
    if (process.env.NODE_ENV === 'development') {
      Fixtures.run();
      console.log(colors.green('✓') + ' Fixtures extecuted succesfully');
    }

    // App Config
    app.set('view engine', 'pug');
    app.set('views', process.env.VIEWS_PATH);
    app.set('json spaces', 2);
    
    // Routes config
    app.use('/api/', express.json());
    app.use('/public', express.static(process.env.BASE_PATH + '/public'));
    
    // Para usar los sourcemaps durante el desarrollo
    if (process.env.NODE_ENV === 'development') {
      app.use('/client', express.static(process.env.BASE_PATH + '/client'));
    }

    // Express middlewares
    app.use(errorHandler);
    app.use(compileStylus);
    
    //Route
    routes.init(app);
    
    let onServerStartCb = function(){
      console.log(colors.green('✓') + ' Environment:     ' + process.env.NODE_ENV);
      console.log(colors.green('✓') + ' Database:        ' + process.env.DB_NAME);
      console.log(colors.green('✓') + ' Port:            ' + process.env.PORT);
      /* @ToDo: [3] Print http or https */
      console.log(colors.green('\nVisit:         localhost:' + process.env.PORT + '\n'));
      TodoCli.init({
        target: ['client/**/*.{js,styl}', 'server/**/*.js'],
        verbose: false
      });
    }
    
    app.listen(process.env.PORT, onServerStartCb);

  }).catch( (error) => {
    console.log('DB error');
    console.log(error);
  }); // dbclient.connect
};
