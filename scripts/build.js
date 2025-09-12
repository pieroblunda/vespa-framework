import Colors from 'colors';
import Stylus from 'stylus';
import Fs from 'node:fs';

let srcPath = `./src/stylus-framework-src.styl`;
let destPath = `./dest/stylus-framework.min.css`;
let stylusContent = Fs.readFileSync(srcPath, 'utf8');
Stylus(stylusContent)
.set('filename', './src/stylus-framework-src.styl')
.set('compress', true)
.render(function(err, css){
  Fs.writeFile(destPath, css, function (err) {
    if (err){
      reject(err);
      return;
    }
    console.log(Colors.grey('compiled stylus') + ` ${srcPath} ➞ ${destPath}`);
  });
});