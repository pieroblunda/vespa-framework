import VespaJs from 'vespajs';
import {Server} from 'vespajs';
import Routes from './server/models/routes.server.model.js';

process.loadEnvFile();
process.unhandledRejections = 'strict';

VespaJs.setGlobalsVariables();
Server.test();
Server.init(Routes.addCustomRoutes).then( ()=> {
  // Runs QR
  // if(process.argv.includes('--qr')){
  //   QRCode.generate(process.env.BASE_URL, function (qr) {
  //     console.log(qr);
  //   });  
  // }
});