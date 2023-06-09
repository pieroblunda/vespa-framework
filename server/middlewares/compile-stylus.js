import Framework from '../../framework/framework.js';

export default function(req, res, next) {
  
  // Production mode
  if(process.env.NODE_ENV === 'production'){
    next();
    return;
  }
  
  Framework.compileStylus().then( (filesGenerated) => {
    next();
  });
}
