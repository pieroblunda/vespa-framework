import Stylus from 'stylus';
import Colors from 'colors';
import Fs from 'node:fs';
import Chokidar from 'chokidar';


class StylusVespa {

  static compileStylus() {
    
    let promisesBag = [];
    
    let input = this.searchStylusFiles();
    input = input.map((item) => {
      return {
        src: item,
        dest: `${global.PUBLIC_PATH}/css`,
        destFilename: item.split('/').at(-1).replace('.styl', '.min.css')
      };
    });
    
    input.forEach( (file) => {
      let fsDescriptor = Fs.openSync(file.src);
      let fileStr = Fs.readFileSync(fsDescriptor, 'utf8');
      Fs.closeSync(fsDescriptor);
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

          file.destFilename = file.destFilename.replace('-src', '');
          Fs.writeFile(`${file.dest}/${file.destFilename}`, css, function (err) {
            if (err){
              reject(err);
              return;
            }
            
            let compiled = {
              src: file.src.replace(global.BASE_PATH, ''),
              dest: file.dest.replace(global.BASE_PATH, ''),
              code: css
            };
            console.log(Colors.grey('compiled stylus') + ` ${compiled.src} ➞ ${compiled.dest}/${file.destFilename}`);
            resolve(compiled);
          });
        });
      });
      promisesBag.push(singlePromise);
    });
    return Promise.all(promisesBag);
  } // compileStylus()

  static searchStylusFiles() {
    let patterns = [
      `${global.CLIENT_PATH}/_*/*-src.styl`,
      `${global.CLIENT_PATH}/styles/*-src.styl`
    ];
    let globOptions = {};
    return Fs.globSync(patterns, globOptions);
  }

  static watchStylus() {
    let stylusFiles = this.searchStylusFiles();
    let options = {};
    Chokidar.watch(stylusFiles, options).on('change', (path, stats) => {
      console.log(Colors.grey('compiled ') + `${path} was changed`);
      StylusVespa.compileStylus();
    });
  }
  
  static compileMiddleware(req, res, next) {  
    // Production mode
    if(process.env.NODE_ENV === 'production') {
      next();
      return;
    }
    
    this.compileStylus().then( (filesGenerated) => {
      next();
    });
  }
  
}

export default StylusVespa;