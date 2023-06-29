import Fs from 'fs';
import Colors from 'colors';
import Stylus from 'stylus';
import Glob from 'glob-array';
import Chokidar from 'chokidar';
import StylusFramework from 'stylus-framework';

class Framework {
  
  static test() {
    console.log('Works!');
  }
  
  static init() {
    this.setupEnvFile();
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
    let rootDirectory = process.cwd();
    global.BASE_PATH = rootDirectory.replace('/framework/framework.js', '');
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
      `${global.CLIENT_PATH}/styles/*.styl`
    ];
    let globOptions = {};
    return Glob.sync(patterns, globOptions);
  }
  
  static compileJs() {
    const BASE_PATH = process.cwd();
    const WATCH_PATH = `${process.cwd()}/client/js`;
    const PUBLIC_PATH = `${BASE_PATH}/public/js`;
    this.copyFolder(WATCH_PATH, PUBLIC_PATH);
  }

  static compileStylus() {
    
    let promisesBag = [];
    
    let input = this.searchStylusFiles();
    input = input.map((item) => {
      let dirPathArr = item.replace(global.CLIENT_PATH, global.PUBLIC_PATH).split('/');
      let targetForlder = dirPathArr.slice(0, -1).join('/');
      return {
        src: item,
        dest: targetForlder,
        destFilename: dirPathArr.at(-1).replace('.styl', '.min.css')
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
          
          // Check if the folder exists
          if(!Fs.existsSync(file.dest)) {
            Fs.mkdirSync(file.dest, { recursive: true });
            console.log(Colors.yellow(`✓ Folder ${file.dest} was created`));
          }

          Fs.writeFile(`${file.dest}/${file.destFilename}`, css, function (err) {
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

  static watchJs() {
    const BASE_PATH = process.cwd();
    const WATCH_PATH = `${process.cwd()}/client/js`;
    const PUBLIC_PATH = `${BASE_PATH}/public/js`;
    Fs.watch(WATCH_PATH, (eventType, filename) => {
      console.log(`>>>> ${eventType} on ${filename}`);
      this.copyFolder(WATCH_PATH, PUBLIC_PATH);
    });
  }

  static watchStylus() {
    let stylusFiles = this.searchStylusFiles();
    let options = {};
    Chokidar.watch(stylusFiles, options).on('change', (path, stats) => {
      console.log(Colors.grey('compiled ') + `${path} was changed`);
      this.compileStylus();
    });
  }

  static copyFolder(src, dest) {
    Fs.cpSync(src, dest, {recursive: true});
    console.log(Colors.grey('compiled ') + `${src} ➞ ${dest}`);
  }

  // static uglifyJs(input, output) {
  //   // Uglify vendor
  //   var allCodeStringVendor = '';
  //   var uglified = null;

  //   input.forEach((file, i) => {
  //     allCodeStringVendor += fs.readFileSync(file, "utf8");
  //   });

  //   uglified = UglifyJS.minify(allCodeStringVendor).code;
    
  //   fs.writeFile(output, uglified, function (err) {
  //     if (err) return console.log(err);
  //     console.log('Compiled:  See the output at ' + output);
  //   });
  // }; // uglifyJs()
  
  static setupEnvFile(){

    if (process.env.NODE_ENV === 'production') {
      return;
    }
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
