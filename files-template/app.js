import VespaJs from 'vespa-framework';
import {Server} from 'vespa-framework';
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