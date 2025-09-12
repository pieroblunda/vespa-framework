import Framework from './framework.js';
import StylusVespa from './stylus.server.model.js';

class Build {
  
  static async run() {
    console.log('Building...');
    Framework.setGlobalsVariables();
    Framework.compileJs();
    Framework.compileMedia();
    await StylusVespa.compileStylus();
    console.log('Build done!');
  }
  
}

export default Build;
