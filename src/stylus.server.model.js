import Fs from 'fs';
import Stylus from 'stylus';
import Colors from 'colors';
import Glob from 'glob-array';
import Chokidar from 'chokidar';


class StylusVespa {

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

          file.destFilename = file.destFilename.replace('-src', '');
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
              console.log(Colors.grey('compiled vespaJs stylus') + `${compiled.src} ➞ ${file.dest}/${file.destFilename}`);
            }
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
    return Glob.sync(patterns, globOptions);
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