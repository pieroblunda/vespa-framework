/* @ToDo: [1] Move this file to scripts */
import Meanivan from '../framework/meanivan.js';
// import Critical from 'critical';
// import Pug from 'pug';
import fs from 'fs';
import colors from 'colors';
import cpy from 'cpy';

var criticalOptions = JSON.parse(fs.readFileSync('critical-conf.json'));

let versionNumber = parseInt(new Date().getTime());

/* @ToDo: [1] rename setGlobals to Config */
Meanivan.setGlobals();

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory() && file.includes('_') && file !== "_devpartner";
  });
}

// Build vendor Css
let input = [],
    partners = [],
    allPartners = getDirectories(process.env.CLIENT_PATH).map( function(item){
      return item.replace('_', '');
    });

let devPartner = process.argv[2] || partners.pop();
if(process.argv[2]){
  // Compile only one partner
  partners.push(process.argv[2]);
}else{
  // Compile all partners
  partners = allPartners;
}

// Recursive function
function compile(partnerCode){
  if(partnerCode === undefined){
    // Meanivan.dbCloseConnection();
    return;
  }
  if (!allPartners.includes(partnerCode)) {
    console.error(`${partnerCode} does not exists`);
    process.exit(1);
  }
  // console.log('\n');
  // console.log('Compiling: ', partnerCode);
  // console.log('--------------------------------');
  
  // Config object
  input = [{
    src:`client/_${partnerCode}/theme.styl`,
    dest: `${process.env.PUBLIC_PATH}/_${partnerCode}/all.min.css`
  }];
  
  // Create folder if not exist
  let folderPath = `${process.env.PUBLIC_PATH}/_${partnerCode}`;
  if (!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath);
    console.log(colors.grey('Created folder ') + `_${partnerCode}`);
  }
  
  // Compile Javascript
  let inputJs = ['client/js/*.js'];
  let outputJs = 'public/js';
  cpy(inputJs, outputJs);

  // Compile Stylus
  Meanivan.compileStylus(input).then(function(filesGenerated){
    filesGenerated.forEach((file, i) => {
      console.log(colors.grey('compiled ') + `${file.srcFile} ➞ ${file.outputFile}`);
    });
    
    //Blog.setAssetsVersion(partnerCode, versionNumber).then( () => {
      //compile(partners.pop());
    //});
    
    /*
    criticalOptions.base = `public/_${partnerCode}`;
    criticalOptions.html = Pug.renderFile('client/views/block-article-template-2.pug', pugOptions);
    criticalOptions.css = [`public/_${partnerCode}/all.min.css`];
    
    let promisesBug = [];

    let criticalPromise = Critical.generate(criticalOptions);
    promisesBug.push(criticalPromise);
    
    criticalPromise.then( ({css, html, uncritical}) => {
      console.log('Critical generated successfully');
      
      // Update critical css on partner database 
      Blog.setCriticalCss(partnerCode, css).then( () => {
        // Update assets version
        Blog.setAssetsVersion(partnerCode, versionNumber).then( function(){
          compile(partners.pop());
        });
      });
    });
    */
    
    
  }).catch( (error)=> {
    console.log(error);
  });
}

/*
console.log('Running....');
console.log('-----------');
console.log('NODE_ENV', process.env.NODE_ENV);
console.log('PORT', process.env.PORT);
console.log('DB_NAME', process.env.DB_NAME);
console.log('FACTORY_TYPE', process.env.FACTORY_TYPE);
console.log('PROTOCOL', process.env.PROTOCOL);
console.log('CONNECTION_STRING', process.env.CONNECTION_STRING);
*/
// For each partner
// Meanivan.dbConnect().then( (err) => {
// });
partners.forEach(partner => {
  compile(partner);
})
