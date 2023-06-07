/* @ToDo: https://expressjs.com/es/advanced/best-practice-performance.html#code */
/* @ToDo: https://blog.cloud66.com/installing-nginx-and-http-2-in-your-local-development-environment/ */
'use strict';
// import spdy from 'spdy';
import fs from 'fs';
import fse from 'fs-extra';
import colors from 'colors';
import QRCode from 'qrcode-terminal';
import DbClient from './dbclient.js';
import TodoCli from 'technical-debt-cli';
import Fixtures from '../server/models/fixtures.server.model.js';
import Meanivan from './meanivan.js';
import * as routes from '../server/routes.js';

export function init(envDotFile) {
  
  return new Promise( (resolve, reject) => {
  
  console.log('=============================================================');
  console.log('Starting server');
  console.log('=============================================================');
  
  // Init DB connection
  DbClient.connect().then(function(err){

    /*
    if(err){
      console.log(colors.red('✗') + ' Error on mongodb connection: ', err);
      return false;
    }
    */
    
    /*Object.keys(envDotFile).forEach( (key) => {
      console.log(`${colors.green('✓')} ${key}: ${process.env[key]}`);
    });*/

    console.log(colors.green('✓') + ' Connected to mongodb succesfully');
    
    // Fixtures
    if (process.env.NODE_ENV === 'development') {
      Fixtures.run();
      console.log(colors.green('✓') + ' Fixtures extecuted succesfully');
    }

    //Route
    let app = routes.init();
    
    /* @ToDo: [2] Move this cb to Meanivan method */
    let onServerStartCb = function(protocol){
      
      /*Object.keys(envDotFile).forEach( (key) => {
        console.log(`${colors.green('✓')} ${key}: ${process.env[key]}`);
      });*/
      
      process.env.BASE_URL = `${protocol}://${Meanivan.getLocalhostIP()}:${process.env.PORT}`;
      console.log(colors.green('\nVisit:         ' + process.env.BASE_URL + '\n'));
      
      // Print QR
      if(process.argv.includes('--qr')){
        QRCode.generate(process.env.BASE_URL, function (qr) {
          console.log(qr);
        });  
      }
      
      if (process.env.NODE_ENV === 'development' || process.env.SHOW_DOCS) {
        // Print Todo
        TodoCli.init({
          target: ['client/**/*.{js,styl}', 'server/**/*.js'],
          verbose: false
        });
        
      }
      
      resolve();
    }
    
    if(process.env.PROTOCOL === 'https'){
      // HTTP2 Server
      /* @ToDo: [1] Unsupported https */
      
      /* @ToDo: [1] Framework: el sistema no se levanta sin las claves */
      
      // const options = {
      //   key: fs.readFileSync(process.env.BASE_PATH + '/server.key'),
      //   cert:  fs.readFileSync(process.env.BASE_PATH + '/server.crt')
      // };
      // 
      // spdy.createServer(options, app).listen(process.env.PORT, (error) => {
      //   if (error) {
      //     console.error(error)
      //     return process.exit(1)
      //   }
      //   onServerStartCb('https');
      // });
    }else{
      // HTTP1.1 Express Server
      app.listen(process.env.PORT, () => {
        onServerStartCb('http');
      });
    }

  }); // dbclient.connect
  
  });
};
