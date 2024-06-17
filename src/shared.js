import Fs from 'fs';

class Shared {

  static getRelativeDirectory() {
    const BASE_PATH = process.cwd();
    const PACKAGE_PATH = `${BASE_PATH}/node_modules/vespa-framework`;
    let copyFromNpmPackage = `${PACKAGE_PATH}/files-template`;
    let copyFromSource = `${BASE_PATH}/files-template`;
    let copyFrom;

    try {
      Fs.accessSync( copyFromNpmPackage, Fs.constants.F_OK);
      copyFrom = copyFromNpmPackage;
    } catch (e) {
      copyFrom = copyFromSource;
    }

    return copyFrom;

  }

}

export default Shared;