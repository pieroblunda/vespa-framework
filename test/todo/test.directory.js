//Requirements
var expect = require('expect.js'),
    request = require('request'),
    fs = require('fs'),
    recursive = require('recursive-readdir');

//Global variables
var p, files, filename, directories, exceptions, isFileException;

describe('i18n files', function(){
  
  it('English locale must be exist', function(){
    var file = fs.existsSync('client/i18n/en-US.json');
    expect(file).to.be(true);
  });
  
  it('Spanish locale must be exist', function(){
    var file = fs.existsSync('client/i18n/es-ES.json');
    expect(file).to.be(true);
  });
  
  it('Portuguese locale must be exist', function(){
    var file = fs.existsSync('client/i18n/pt-BR.json');
    expect(file).to.be(true);
  });
  
  it('Quantity EN translations keys', function(){
    var countES = Object.keys(JSON.parse(fs.readFileSync('client/i18n/es-ES.json'))).length;
    var countEN = Object.keys(JSON.parse(fs.readFileSync('client/i18n/en-US.json'))).length;
    expect(countEN).to.be(countES);
  });
  
  it('Quantity PT translations keys', function(){
    var countES = Object.keys(JSON.parse(fs.readFileSync('client/i18n/es-ES.json'))).length;
    var countPT = Object.keys(JSON.parse(fs.readFileSync('client/i18n/pt-BR.json'))).length;
    expect(countPT).to.be(countES);
  });
  
  it('Spanish translation file must be a valid JSON', function(done){
    try {
      var data = JSON.parse(fs.readFileSync('client/i18n/es-ES.json'));
      done();
    } catch(err) {
      done(err);
    }
  });
  
  it('English translation file must be a valid JSON', function(done){
    try {
      var data = JSON.parse(fs.readFileSync('client/i18n/en-US.json'));
      done();
    } catch(err) {
      done(err);
    }
  });
  
  it('Portuguese translation file must be a valid JSON', function(done){
    try {
      var data = JSON.parse(fs.readFileSync('client/i18n/pt-BR.json'));
      done();
    } catch(err) {
      done(err);
    }
  });
  
  it('Quantity PT translations keys', function(){
    var esES = JSON.parse(fs.readFileSync('client/i18n/es-ES.json'));
    var countES = Object.keys(esES).length;
    
    var enUS = JSON.parse(fs.readFileSync('client/i18n/pt-BR.json'));
    var countEN = Object.keys(enUS).length;
    expect(countEN).to.be(countES);
  });
  
  it('Keys must be written in lowercase (es-ES)', function(){
    var esES = JSON.parse(fs.readFileSync('client/i18n/es-ES.json'));
    var condition = true;
    var currentBoolean;
    Object.keys(esES).forEach(function(item, index){
      currentBoolean = /^[a-z.]*$/.test(item);
      condition = currentBoolean && condition;
      if(!currentBoolean){
        console.log(item);
      }
    });
    expect(condition).to.be(true);
  });
  
  it('Keys must be in the same order thought files', function(){
    var esES = JSON.parse(fs.readFileSync('client/i18n/es-ES.json'));
    var arrEsES = Object.keys(esES);
    var enUS = JSON.parse(fs.readFileSync('client/i18n/en-US.json'));
    var arrEnUS = Object.keys(enUS);
    var ptBR = JSON.parse(fs.readFileSync('client/i18n/pt-BR.json'));
    var arrPtBR = Object.keys(ptBR);
    var condition = true;
    
    arrEsES.forEach(function(item, index){
      var currentBoolean = arrEsES[index] === arrEnUS[index] && arrEsES[index] === arrPtBR[index];
      condition = currentBoolean && condition;
      
      if(!currentBoolean){
        console.log(arrEsES[index], arrEnUS[index], arrPtBR[index]);
      }
      
    });
    expect(condition).to.be(true);
    
  });
  
});

describe('Test the filesname into project directory', function(){
    
    directories = ['test', 'client', 'server']; // 'scripts'

    exceptions = ['.DS_Store', '.gitkeep', 'i18n'];
    directories.forEach(function(directory, index){
      it('Analize '+directory+' folder', function(done){
        recursive(directory, function (err, files) {
          files.forEach(function(file, index){
            if(file.indexOf('/') >= 0){
              // if linux
              filename = file.split('/').pop();
            } else {
              // if windows
              filename = file.split('\\').pop();
            }
            
            isFileException = false;
            exceptions.forEach(function(exception){
              if(file.indexOf(exception) >= 0){
                isFileException = true;
              }
            });
            
            if(!isFileException){
              expect(filename).to.match(/^[a-z]+[a-z-.0-9]*.[a-z]{2,4}$/);
            }
            
            if(index === files.length - 1){
              done();
            }
            
          });
        });
      });
    });
    
});