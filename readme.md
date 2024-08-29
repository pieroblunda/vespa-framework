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
