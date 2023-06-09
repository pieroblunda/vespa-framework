import Fs from 'fs';
import Colors from 'colors';
import Stylus from 'stylus';
import { fileURLToPath } from 'url';

class Framework {
  
  static setGlobalsVariables() {
    global.BASE_PATH = fileURLToPath(import.meta.url).replace('/framework/framework.js', '');
    global.CLIENT_PATH = global.BASE_PATH + '/client';
    global.SERVER_PATH = global.BASE_PATH + '/server';
    global.VIEWS_PATH = global.BASE_PATH + '/client/views';
    global.PUBLIC_PATH = global.BASE_PATH + '/public';
  }
  
  static compileStylus(){
    
    let input = [{
      src: `client/styles/app.styl`,
      dest: `${global.PUBLIC_PATH}/css/app.min.css`
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
            console.log(Colors.grey('compiled ') + `${compiled.src} ➞ ${file.dest}`);
          });
        });
      });
      promisesBag.push(singlePromise);
    });
    
    return Promise.all(promisesBag);
  } // compileStylus()
  
}

export default Framework;
