'use strict';
import fs from 'fs';
import stylus from 'stylus';
/* @ToDo: [1] Move this file inside framework/server/middleware */
/* @ToDo: [1] this middleware it be runned many times */

export default function(req, res, next) {
  
  if(req.originalUrl.includes('/api')){
    next();
    return;
  }
  
  console.log('Compiling Stylus...');
  console.log(req.originalUrl);
  let options = {
    src: process.env.BASE_PATH + '/client/styles/main.styl',
    dest: process.env.BASE_PATH + '/public/css/styles.css',
    paths:[
      process.env.BASE_PATH + '/client/styles/**',
    ]
  };
  
  let fileStr = fs.readFileSync(options.src, "utf8");
  stylus(fileStr)
  .set('paths', options.paths)
  .set('compress', true)
  .render(function(err, css){
    fs.writeFile(options.dest, css, function (err) {
      if (err) return console.log(err);
      console.log('Compiled:  See the output at ' + options.dest);
    });
  });
  next();
}
