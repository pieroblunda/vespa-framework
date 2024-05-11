import Fs from 'fs';

class Utils {

  static getAppVersion() {
    const FILE_PATH = `${process.cwd()}/package.json`;
    let content = JSON.parse(Fs.readFileSync(FILE_PATH, 'utf8'));
    return content.version;
  }

}

console.log(Utils.getAppVersion());