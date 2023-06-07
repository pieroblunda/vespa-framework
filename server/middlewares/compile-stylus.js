import fs from 'fs';
import stylus from 'stylus';
import colors from 'colors';
import Meanivan from '../../framework/meanivan.js';

export default function(req, res, next) {
  
  // Production mode
  if(process.env.NODE_ENV === 'production'){
    next();
    return;
  }
  
  // Compile stylus in Dev mode
  let input = [{
    src: `client/styles/app.styl`,
    dest: `${process.env.PUBLIC_PATH}/css/app.min.css`
  }];
  
  Meanivan.compileStylus(input).then(function(filesGenerated){
    filesGenerated.forEach((file, i) => {
      console.log(colors.grey('compiled ') + `${file.srcFile} ➞ ${file.outputFile}`);
    });
    
    next();
  });
}
