import Fs from 'fs';
import Colors from 'colors';
import Glob from 'glob-array';

import StylusVespa from './stylus.server.model.js';
import Server from './server.js';
import Routes from './routes.js';
import Db from './db.js';
import Crud from './crud.server.model.js';
import Utils from './utils.server.model.js';
import Environment from './environment.server.model.js';
import Shared from './shared.js';

// const compileStylusMiddleware = StylusVespa.compileMiddleware;

class Framework {
  
  static test() {
    console.log('Works!');
  }

  static install() {
    Environment.setupEnvFile();
    this.createDirectories();
    this.installMustHaveFiles();
    this.updatePackageJsonOptions();
    this.writeGitKeepFile();
    this.writeGitIgnore();
  }
  
  static init() {
    Environment.load();
    this.createDirectories();
    this.setGlobalsVariables();
    StylusVespa.compileStylus();
  }
  
  static setGlobalsVariables() {
    let rootDirectory = process.cwd();
    global.BASE_PATH = rootDirectory.replace('/framework/framework.js', '');
    global.CLIENT_PATH = global.BASE_PATH + '/client';
    global.SERVER_PATH = global.BASE_PATH + '/server';
    global.VIEWS_PATH = global.BASE_PATH + '/client/views';
    global.PUBLIC_PATH = global.BASE_PATH + '/public';

    console.log('Global variables:');
    console.log(`global.BASE_PATH: ${global.BASE_PATH}`);
    console.log(`global.CLIENT_PATH: ${global.CLIENT_PATH}`);
    console.log(`global.SERVER_PATH: ${global.SERVER_PATH}`);
    console.log(`global.VIEWS_PATH: ${global.VIEWS_PATH}`);
    console.log(`global.PUBLIC_PATH: ${global.PUBLIC_PATH}`);
    console.log('---------------------------------------------------------');
    console.log('');
  }
  
  static compileJs() {
    const BASE_PATH = process.cwd();
    const WATCH_PATH = `${process.cwd()}/client/js`;
    const PUBLIC_PATH = `${BASE_PATH}/public/js`;
    this.copyFolder(WATCH_PATH, PUBLIC_PATH);
  }

  static compileMedia() {
    let src = `${global.CLIENT_PATH}/media`;
    let dest = `${global.PUBLIC_PATH}/media`;
    Fs.cpSync(src, dest, {recursive: true});
    console.log(Colors.grey('copyed ') + `${src} ➞ ${dest}/${dest}`);
  }
  
  static createDirectories() {
    const FILE_TEMPLATE_PATH = Shared.getRelativeDirectory();
    let tree = [
      'client/media',
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
      'server/models',
      'server/controllers',
      'server/middlewares',
      'test',
    ];
    for (var i = 0; i < tree.length; i++) {
      if(!Fs.existsSync(tree[i])) {
        Fs.mkdirSync(tree[i], { recursive: true });
        console.log(Colors.yellow('✓') + ` Folder ${tree[i]} was created`);
      }
    }
    console.log(Colors.green('✓') + ' Structure folder checked');
  }

  static installMustHaveFiles() {
    const FILE_TEMPLATE_PATH = Shared.getRelativeDirectory();
    let files = [
      'app.js',
      '.editorconfig',
      'readme.md',
      'railway.json',
      'client/views/page-404.pug',
      'client/views/main.pug',
      'client/views/block-landing.pug',
      'client/styles/styles-src.styl',
      'client/styles/stylus-framework-src.styl',
      'server/models/routes.server.model.js',
      'server/models/calculator.server.model.js',
      'server/controllers/example.server.controller.js',
      'server/middlewares/example.server.middleware.js',
      'test/calculator.unit.test.js'

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

  static writeGitKeepFile() {
    const FILE_TEMPLATE_PATH = Shared.getRelativeDirectory();
    let files = [
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
    for (var i = 0; i < files.length; i++) {
      Fs.writeFileSync(`${files[i]}/.gitkeep`, '');
      console.log(Colors.green('✓') + ` Created ${files[i]}/.gitkeep`);
    }
  }

  static writeGitIgnore() {
    let content = `node_modules
mongod.bat
coverage
reports/**/*
public/**/*
!**/*.gitkeep
*.log
*.DS_Store`;
    Fs.writeFileSync(`.gitignore`, content);
    console.log(Colors.green('✓') + ` Created .gitignore`);
  }

  static updatePackageJsonOptions() {
    const vespaConfig = {
      type: 'module',
      main: 'app.js',
      scripts: {
        start: 'node app.js',
        debug: 'node --inspect-brk app.js',
        staging: 'node --env-file=.env-production app.js',
        build: 'node node_modules/vespa-framework/src/build.js',
        // prod: 'heroku local -e .env.prod',
        qr: 'node app.js default-partner --qr',
        fixtures: 'node app.js --fixtures',
        coverage: 'node --test --experimental-test-coverage'
      },
      engines: {
        // http://vercel.link/node-version
        node: '20.x',
        npm: '10.x'
      }
    };

    let fsDescriptor = Fs.openSync('package.json');
    let fileStr = JSON.parse(Fs.readFileSync(fsDescriptor, "utf8"));
    let updatedContent = JSON.stringify({...fileStr, ...vespaConfig}, null, 2);
    Fs.closeSync(fsDescriptor);
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
  
}

export default Framework;