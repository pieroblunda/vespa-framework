import Fs from 'fs';
import Stylus from 'stylus';
import Pug from 'pug';
import Colors from 'colors';
import { fileURLToPath } from 'url';


class StylusFramework {
  
  static compileAll() {
    this.compileStylus();
  }
  
  static copyTo(dir) {
    // const fromDirectory = fileURLToPath(import.meta.url).replace('/app.js', '');
    // const from = `${fromDirectory}/dest/stylus-framework.min.css`;
    // const to = `${dir}/stylus-framework.min.css`;
    // Fs.copyFile(from, to, (error) => {
    //   if (error) {
    //     throw error
    //     return;
    //   }
    //   console.log(Colors.grey('copied ') + `${from} ➞ ${to}`);
    // })
  }
  
  static compileStylus() {
    
    let input = [{
      src: `./src/app.styl`,
      dest: `./public/stylus/stylus-framework.min.css`
    }];
    
    let promisesBag = [];
    
    input.forEach(function(file){
      let fileStr = Fs.readFileSync(file.src, "utf8");
      let singlePromise = new Promise( (resolve, reject) => {
        Stylus(fileStr)
        .set('filename', file.src)
        .set('compress', true)
        /* @ToDo: [3] sourcemap does not work */
        // .set('sourcemap', true)
        .set('paths', [
          global.BASE_PATH + '/client/src',
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
            console.log(Colors.grey('compiled ') + `${compiled.src} ➞ ${file.dest}`);
          });
        });
      });
      promisesBag.push(singlePromise);
    });
    
    return Promise.all(promisesBag);
  } // compileStylus()
  
}

export default StylusFramework;