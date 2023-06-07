import fs from 'fs';
import colors from 'colors';
import { fileURLToPath } from 'url';
import Stylus from 'stylus';
import UglifyJS from 'uglify-js';
import UglifyCss from 'uglifycss';
import GlobArray from 'glob-array';

class Meanivan {
  
  static setGlobals(){
    /* @ToDo: Replace with global variable */
    process.env.BASE_PATH = fileURLToPath(import.meta.url).replace('/framework/meanivan.js', '');
    process.env.CLIENT_PATH = process.env.BASE_PATH + '/client';
    process.env.SERVER_PATH = process.env.BASE_PATH + '/server';
    process.env.VIEWS_PATH = process.env.BASE_PATH + '/client/views';
    process.env.PUBLIC_PATH = process.env.BASE_PATH + '/public';
    process.env.DEV_API_BASEURL = `${process.env.PROTOCOL}://localhost:${process.env.PORT}`;
    this.setGlobalsVariables();
  }
  
  static setGlobalsVariables(){
    global.BASE_PATH = fileURLToPath(import.meta.url).replace('/framework/meanivan.js', '');
    global.CLIENT_PATH = global.BASE_PATH + '/client';
    global.SERVER_PATH = global.BASE_PATH + '/server';
    global.VIEWS_PATH = global.BASE_PATH + '/client/views';
    global.PUBLIC_PATH = global.BASE_PATH + '/public';
    global.DEV_API_BASEURL = `${process.env.PROTOCOL}://localhost:${process.env.PORT}`;
  }
  
  /* @ToDo: [1] Setup this function */
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
  
  static buildProd() {
    let input, output, appFiles;
    appFiles = this.getAppFiles();
    // Build vendor Js
    input = appFiles.vendorJs;
    output = 'public/js/vendor.min.js';
    this.uglifyJs(input, output);
    
    // Build vendor Css
    input = appFiles.vendorCss;
    output = 'public/css/vendor.min.css';
    this.uglifyCss(input, output);
    
    // Build app Js
    input = appFiles.ownJs;
    output = 'public/js/app.min.js';
    this.uglifyJs(input, output);
    
    // Build app Css
    input = appFiles.ownCss;
    output = 'public/js/app.min.css';
    // uglifyCss(input, output);
  } // buildProd()
  
  static compileStylus(input, output){
    
    // Allow accept string or array
    if (typeof input === 'string' ){
      input = [input];
    }
    
    let promisesBag = [];
    
    input.forEach(function(file){
      let fileStr = fs.readFileSync(file.src, "utf8");
      let singlePromise = new Promise( (resolve, reject) => {
        Stylus(fileStr)
        .set('filename', file.src)
        .set('compress', true)
        /* @ToDo: [3] sourcemap does not work */
        // .set('sourcemap', true)
        .set('paths', [
          process.env.BASE_PATH + '/client/styles',
          process.env.BASE_PATH + '/client/**',
        ])
        .render(function(err, css){
          
          if(err){
            reject(err);
            return;
          }
          
          fs.writeFile(file.dest, css, function (err) {
            if (err){
              reject(err);
              return;
            }
            resolve({srcFile: file.src, outputFile: file.dest.replace(`${process.env.BASE_PATH}/`, ''), code: css});
          });
        });
      });
      promisesBag.push(singlePromise);
    });
    
    return Promise.all(promisesBag);
  } // compileStylus()
  
}

export default Meanivan;
