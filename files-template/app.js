import VespaJs from 'vespa-framework';
import Routes from './server/models/routes.server.model.js';

process.unhandledRejections = 'strict';

VespaJs.core.init();
VespaJs.server.init(Routes.addCustomRoutes).then( ()=> {
  // Runs QR
  // if(process.argv.includes('--qr')){
  //   QRCode.generate(process.env.BASE_URL, function (qr) {
  //     console.log(qr);
  //   });  
  // }
});