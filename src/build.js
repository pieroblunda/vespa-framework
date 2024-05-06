import Framework from './framework.js';
import StylusVespa from './stylus.server.model.js';

class Build {
  
  static run() {
    console.log('Building...');
    Framework.setGlobalsVariables();
    Framework.compileJs();
    Framework.compileMedia();
    StylusVespa.compileStylus();
    console.log('Build done!');
  }
  
}

export default Build;
