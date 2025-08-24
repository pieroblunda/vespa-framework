import Fs from 'fs';
import Colors from 'colors';
import Shared from './shared.js';

class Environment {

  static load() {
    // Load file .env in Dev environmet
    if(!process.env.NODE_ENV) {
      process.loadEnvFile();
    }
    console.log(Colors.green('✓') + ' Env file loaded');
  }

  static setupEnvFile() {

    if (process.env.NODE_ENV === 'production') {
      return;
    }
    return new Promise( (resolve, reject) => {

      const FILE_TEMPLATE_PATH = Shared.getRelativeDirectory();
      
      // Check if the file exists in the current directory.
      if(!Fs.existsSync(`${process.cwd()}/.env`)) {
        Fs.copyFileSync(`${FILE_TEMPLATE_PATH}/.env-template`, '.env', Fs.constants.COPYFILE_EXCL);
        console.log(Colors.green('✓') + ' CHECK THE .env DEFAULTS OPTIONS', Colors.yellow('<==============='));
      }

      // Check if the file exists in the current directory.
      if(!Fs.existsSync(`${process.cwd()}/.env-production`)) {
        Fs.copyFileSync(`${FILE_TEMPLATE_PATH}/.env-production`, '.env-production', Fs.constants.COPYFILE_EXCL);
        console.log(Colors.green('✓') + ' CHECK THE .env-production DEFAULTS OPTIONS', Colors.yellow('<==============='));
      }
    });

  } //createEnvFile()

}

export default Environment;