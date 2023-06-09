'use strict';
import * as routes from '../server/routes.js';

import express from 'express';

class Server {
  
  static init() {
    
    console.log('=============================================================');
    console.log('Starting server');
    console.log('=============================================================');
    
    let app = express();
    app.get('/', function(req, res){
      res.json({foo: 'bar'});
    });
    
    process.env.PORT = process.env.PORT || 3000;
    app.listen(process.env.PORT, () => {
      console.log('Server started')
    });
  }
  
}

export default Server;