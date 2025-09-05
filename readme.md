# Vespa Framework

## Install
```
$ npm install vespa-framework
$ node node_modules/vespa-framework/src/install.js
$ node app.js
```

## Funcionalidades

```
Los archivos Stylus que se compilan tienen que incluir en el nombre `-src.styl`
```

```
import {Db} from 'vespa-framework';
Se puede saber el nombre del Database llamando a Db.dbName
```

```
Se puede saber las estadisticas del database haciendo 

import {Db} from 'vespa-framework';
Db.getStats().then( (stats) => {
  console.log(stats);
});
```

## Crud

Es posible utilizar metodos de crud ya escritos 

```javascript
// 1. Crear una clase que extiende de -Crud-
import {Crud} from 'vespa-framework';

class Test extends Crud {
  
  static collectionName = 'test';

}
```

## Crud
```
Test.bulkUpdate(docsUpdate);
```

```javascript
// En la clase se puede tener acceso a los metodos:
Test.updateOne({foo: 'bar'}).then( (result) => {
  console.log(result);
})
Test.getById('66375e986361482741d1c230').then( (doc) => {
  console.log(doc);
});
Test.findOne({foo: 'bar'}).then( (doc) => {
  console.log(doc);
});
Test.getByQuery({foo: 'bar'}).then( (result) => {
  console.log(result);
});
Test.count().then( (result) => {
  console.log(result);
});
Test.deleteById('66375e986361482741d1c230').then( (result) => {
  console.log(result);
});
const docs = [
  { name: "cake", healthy: false },
  { name: "lettuce", healthy: true },
  { name: "donut", healthy: false }
];
// Prevent additional documents from being inserted if one fails
const options = { ordered: true };
Test.insertMany(docs, options).then( (result) => {
  console.log(result);
});
```

## Global variables 

* global.BASE_PATH: ./
* global.CLIENT_PATH: ./client
* global.SERVER_PATH: ./server
* global.VIEWS_PATH: ./client/views
* global.PUBLIC_PATH: ./public

## Compatibility with technical-debt-cli

https://github.com/pieroblunda/technical-debt-cli


## External libraries

| Package | Description |
| [body-parser](https://www.npmjs.com/package/) | Node.js body parsing middleware. |
| [Chokidar](https://www.npmjs.com/package/chokidar) | Watch stylus files to compile on change | 
| [Colors](https://www.npmjs.com/package/colors) | Color terminal stdout | 
| [Compression](https://www.npmjs.com/package/compression) | Node.js compression middleware |
| [Cors](https://www.npmjs.com/package/cors)| Node.js cors middleware |
| [Express](https://www.npmjs.com/package/express) | Fast, unopinionated, minimalist Node.js web framework |
| [Glob Array](https://www.npmjs.com/package/glob-array) | Allow use glob patters. Used in stylus projects |
| [MongoDb](https://www.npmjs.com/package/mongodb) | The official MongoDB driver for Node.js. Used only in MondoDb Projects |
| [Pug](https://www.npmjs.com/package/pug) | HTML preprocessor | 
| [Stylus](https://www.npmjs.com/package/stylus) | CSS preprocessor. Used only in stylus projects |
| [Technical Debt cli](https://www.npmjs.com/package/technical-debt-cli) | Read debt from te terminal |