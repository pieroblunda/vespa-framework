import Fs from 'fs';

class Utils {

  static getAppVersion() {

    if(this.isDevelopment()) {
      return Date.now();
    }

    const FILE_PATH = `${process.cwd()}/package.json`;
    let fsDescriptor = Fs.openSync(FILE_PATH);
    let content = JSON.parse(Fs.readFileSync(fsDescriptor, 'utf8'));
    Fs.closeSync(fsDescriptor);
    return content.version;
  }

  static isDevelopment() {
    return process.env.NODE_ENV === 'development';
  }

}

export default Utils;