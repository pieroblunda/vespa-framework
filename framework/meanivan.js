import fs from 'fs';
import colors from 'colors';
import path from 'path';
import { fileURLToPath } from 'url';
// import UglifyJS from 'uglify-js';
// import UglifyCss from 'uglifycss';
// import GlobArray from 'glob-array';

class Meanivan {
  
  static getMeanivanConf(){
    return JSON.parse(fs.readFileSync(process.env.BASE_PATH + '/meanivan-conf.json'));
  }
  
  static setGlobals(){
    /* @ToDo: Replace with global variable */
    process.env.BASE_PATH = fileURLToPath(import.meta.url).replace('/framework/meanivan.js', '');
    process.env.SERVER_PATH = process.env.BASE_PATH + '/server';
    process.env.VIEWS_PATH = process.env.BASE_PATH + '/client/views';
  }
  
  static createEnvFile(){
    return new Promise(function(resolve, reject) {
      const path = process.cwd() + '/.env';
      // Check if the file exists in the current directory.
      fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
          fs.copyFile('framework/files-templates/.env-template', '.env', (err) => {
            if (err) throw err;
            console.log(colors.green('✓') + ' Environment file config .env created succesfully with the default options.');
            console.log(colors.green('✓') + ' CHECK THE .env DEFAULTS OPTIONS', colors.yellow('<==============='));
            resolve();
          });
        }
      });
    });
  } //createEnvFile()
  
  static uglifyJs(input, output){
    // Uglify vendor
    var allCodeStringVendor = '';
    var uglified = null;

    input.forEach((file, i) => {
      allCodeStringVendor += fs.readFileSync(file, "utf8");
    });

    uglified = UglifyJS.minify(allCodeStringVendor).code;
    
    fs.writeFile(output, uglified, function (err) {
      if (err) return console.log(err);
      console.log('Compiled:  See the output at ' + output);
    });
  }; // uglifyJs()
  
  static uglifyCss(input, output){
    const options = {
      uglyComments: true
    }
    var uglified = UglifyCss.processFiles(input, options);
    
    fs.writeFile(output, uglified, function (err) {
      if (err) return console.log(err);
      console.log('Compiled:  See the output at ' + output);
    });
  } // uglifyCss()
  
}

export default Meanivan;
