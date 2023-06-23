import Fs from 'fs';
import Colors from 'colors';
import Stylus from 'stylus';
import Glob from 'glob-array';
import { fileURLToPath } from 'url';
import StylusFramework from 'stylus-framework';

class Framework {
  
  static test() {
    console.log('Works!');
  }
  
  static init() {
    this.createEnvFile();
    this.createDirectories();
    this.setGlobalsVariables();
    this.compileStyusFramework();
    this.compileStylus();
    
    /* @ToDo: [1] must to create the .gitkeet files in each folder */
    /* @ToDo: [1] package.json must have $ npm run debug  */
    /* @ToDo: [1] package.json must have $ npm run build  */
    /* @ToDo: [1] package.json must have $ npm run prod  */
    /*
    scripts: {
      "debug": "node --inspect-brk app.js",
      "build": "node scripts/heroku-build.js",
      "prod": "heroku local -e .env.prod"
    }
    */
    
    /* @ToDo: [1] package.json must have engines keys  */
    /*
    "engines": {
      "node": "14.x",
      "npm": "7.x"
    },
    */
    
    /* @ToDo: [1] must create ./app.js is not exists  */
    /* @ToDo: [1] must create ./.gitignore is not exists  */
    /* @ToDo: [1] must create ./.env is not exists  */
    /* @ToDo: [1] must create ./.readme.md is not exists  */
    /* @ToDo: [1]  must create jest-config.json is not exists */
    
    /* @ToDo: [1] Must create defaultls /server/models */
    /* @ToDo: [1] Must create defaultls /server/controllers */
    /* @ToDo: [1] Must create defaultls /server/middleware */
    
  }
  
  static setGlobalsVariables() {
    global.BASE_PATH = fileURLToPath(import.meta.url).replace('/framework/framework.js', '');
    global.CLIENT_PATH = global.BASE_PATH + '/client';
    global.SERVER_PATH = global.BASE_PATH + '/server';
    global.VIEWS_PATH = global.BASE_PATH + '/client/views';
    global.PUBLIC_PATH = global.BASE_PATH + '/public';
  }
  
  static compileStyusFramework() {
    const PUBLIC_PATH = `${process.cwd()}/public`;
    StylusFramework.copyTo(`${PUBLIC_PATH}/css`);
    console.log(Colors.green('✓') + ' StylusFramework compiled');
  }
  
  static searchStylusFiles() {
    let patterns = [
      `${global.CLIENT_PATH}/_*/*.styl`,
      `${global.CLIENT_PATH}/styles/app.styl`
    ];
    let globOptions = {};
    return Glob.sync(patterns, globOptions);
  }
  
  static compileStylus() {
    
    let promisesBag = [];
    
    let input = this.searchStylusFiles();
    input = input.map((item) => {
      return {
        src: item,
        dest: item.replace(global.CLIENT_PATH, global.PUBLIC_PATH).replace('.styl', '.min.css')
      };
    });
    
    input.forEach(function(file){
      let fileStr = Fs.readFileSync(file.src, "utf8");
      let singlePromise = new Promise( (resolve, reject) => {
        Stylus(fileStr)
        .set('filename', file.src)
        .set('compress', true)
        /* @ToDo: [3] sourcemap does not work */
        // .set('sourcemap', true)
        .set('paths', [
          global.BASE_PATH + '/client/styles',
          global.BASE_PATH + '/client/**',
        ])
        .render(function(err, css){
          
          if(err){
            reject(err);
            return;
          }
          
          Fs.writeFile(file.dest, css, function (err) {
            if (err){
              reject(err);
              return;
            }
            
            let compiled = {
              src: file.src,
              dest: file.dest.replace(`${process.env.BASE_PATH}/`, ''),
              code: css
            };
            resolve(compiled);
            if(parseInt(process.env.VERBOSE)){
              console.log(Colors.grey('compiled ') + `${compiled.src} ➞ ${file.dest}`);
            }
          });
        });
      });
      promisesBag.push(singlePromise);
    });
    console.log(Colors.green('✓') + ' CSS compiled');
    return Promise.all(promisesBag);
  } // compileStylus()
  
  static createDirectories() {
    let tree = [
      'client/assets',
      'client/js',
      'client/styles',
      'client/views',
      'client/coverage',
      'fixtures',
      'public/css',
      'public/js',
      'public/media',
      'reports',
      'scripts',
      'server/controllers',
      'server/middlewares',
      'server/models',
      'test',
    ];
    for (var i = 0; i < tree.length; i++) {
      if(!Fs.existsSync(tree[i])) {
        Fs.mkdirSync(tree[i], { recursive: true });
        console.log(Colors.yellow('✓') + `Folder ${tree[i]} was created`);
      }
    }
    console.log(Colors.green('✓') + ' Structure folder checked');
    
  }
  
  static createEnvFile(){
    return new Promise(function(resolve, reject) {
      const BASE_PATH = process.cwd();
      const PACKAGE_PATH = `${process.cwd()}/node_modules/node-framework`;
      const dotEnvPath = BASE_PATH + '/.env';
      // Check if the file exists in the current directory.
      try {
        Fs.accessSync( dotEnvPath, Fs.constants.F_OK);
        console.log(Colors.green('✓') + ' Environment file .env detected');
      } catch (e) {
        Fs.copyFileSync(`${PACKAGE_PATH}/files-template/.env-template`, '.env', Fs.constants.COPYFILE_EXCL);
        console.log(Colors.green('✓') + ' CHECK THE .env DEFAULTS OPTIONS', Colors.yellow('<==============='));
      }
    });
  } //createEnvFile()
  
}

export default Framework;
