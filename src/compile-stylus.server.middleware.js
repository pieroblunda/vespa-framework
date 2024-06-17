import StylusVespa from './stylus.server.model.js';

export default function(req, res, next) {
  
  // Production mode
  if(process.env.NODE_ENV === 'production' || parseInt(process.env.SKIP_COMPILE_STYLUS) === 1 ) {
    next();
    return;
  }
  
  StylusVespa.compileStylus().then( (filesGenerated) => {
    next();
  });

}
