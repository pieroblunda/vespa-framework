import Fs from 'fs';
import Colors from 'colors';
import Stylus from 'stylus';
import Glob from 'glob-array';
import Chokidar from 'chokidar';
import StylusFramework from './stylus-framework.js';

import Server from './server.js';
import Routes from './routes.js';

class Framework {
  
  static test() {
    console.log('Works!');
  }
  
  static init() {
    this.setupEnvFile();
    this.createDirectories();
    this.setGlobalsVariables();
    // this.compileStyusFramework();
    this.compileStylus();
    this.updatePackageJsonOptions();
    
    /* @ToDo: [1] must to create the .gitkeep files in each folder */
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
  
  // static compileStyusFramework() {
  //   const PUBLIC_PATH = `${process.cwd()}/public`;
  //   StylusFramework.copyTo(`${PUBLIC_PATH}/css`);
  //   console.log(Colors.green('✓') + ' StylusFramework compiled');
  // }
  
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
    
    input.forEach( (file) => {
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
    const FILE_TEMPLATE_PATH = this.getRelativeDirectory();
    let tree = [
      'client/assets',
      'client/js',
      'client/styles',
      'client/views',
      'coverage',
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
        console.log(Colors.yellow('✓') + ` Folder ${tree[i]} was created`);
      }
    }
    console.log(Colors.green('✓') + ' Structure folder checked');

    // Create files


    // app.js
    let files = [
      'app.js',
      '.editorconfig',
      '.gitignore',
      'readme.md',
      'server/models/routes.server.model.js',
      'server/controllers/example.server.controller.js'
    ];
    for (var i = 0; i < files.length; i++) {
      if(!Fs.existsSync(files[i])) {
        Fs.copyFileSync(`${FILE_TEMPLATE_PATH}/${files[i]}`, files[i], Fs.constants.COPYFILE_EXCL);
        console.log(Colors.green('✓') + ` COPYED ${files[i]}`);
      }
    }
    
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
  
  static setupEnvFile() {

    if (process.env.NODE_ENV === 'production') {
      return;
    }
    return new Promise( (resolve, reject) => {

      const FILE_TEMPLATE_PATH = this.getRelativeDirectory();
      
      // Check if the file exists in the current directory.
      if(!Fs.existsSync(`${process.cwd()}/.env`)) {
        Fs.copyFileSync(`${FILE_TEMPLATE_PATH}/.env-template`, '.env', Fs.constants.COPYFILE_EXCL);
        console.log(Colors.green('✓') + ' CHECK THE .env DEFAULTS OPTIONS', Colors.yellow('<==============='));
      }
    });

  } //createEnvFile()

  static updatePackageJsonOptions() {
    const vespaConfig = {
      type: 'module',
      main: 'app.js',
      scripts: {
        start: 'node app.js',
        debug: 'node --inspect-brk app.js',
        build: 'node node_modules/vespajs/scripts/build.js',
        prod: 'heroku local -e .env.prod',
        qr: 'node app.js default-partner --qr',
        fixtures: 'node app.js --fixtures',
      },
      engines: {
        node: '21.x',
        npm: '10.x'
      }
    };

    let fileStr = JSON.parse(Fs.readFileSync('package.json', "utf8"));
    let updatedContent = JSON.stringify({...fileStr, ...vespaConfig}, null, 2);
    Fs.writeFile(`package.json`, updatedContent, (err) => {
      if (err){
        reject(err);
        return;
      }
      
      if(parseInt(process.env.VERBOSE)){
        console.log(Colors.grey('PackageJson updated ') + `package.json ➞ package.json}`);
      }
    });

  }

  static getRelativeDirectory() {
    const BASE_PATH = process.cwd();
    const PACKAGE_PATH = `${BASE_PATH}/node_modules/vespajs`;
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

export default Framework;
export {Server, Routes};