import Framework from './framework.js';

class Build {
  
  static run() {
    console.log('Building...');
    Framework.setGlobalsVariables();
    Framework.compileStylus();
    Framework.compileJs();
    console.log('Build done!');
  }
  
}

export default Build;
