# Vespa Framework

## Requirements

* node v24

## Install
```
$ npm install vespa-framework
$ node node_modules/vespa-framework/src/install.js
$ node app.js
```

## CSS & Preprocessors

VespaJs soporta stylus como preprocessor.

Con el comando `$ node --run build` el sistema busca todos las hojas de estilo ubicados en `client/styles`. Cada archivo con el sufijo `-src.styl` generara un archivo nuevo en la carpeta `public/css`.

```bash
/my-project
  ├── package.json
  └── client
      └── styles
          ├── main-src.styl     
          ├── file-1.styl
          ├── file-2.styl 
          └── example.styl

```

Compiles to

```bash
/my-project
  ├── package.json
  └── public
      └── css
          ├── main.min.css
          └── example.min.css

```

Di default, el sistema inyecta un `reset.css`. Para evitarlo, basta comentar la linea 1 del archivo `main-src-.styl` de esta manera

```diff
- @require './../../node_modules/vespa-framework/src/stylus-framework-src.styl';
@require 'file-1.styl'
@require 'file-2.styl'

body
  font-size 4rem
```

Para mantener el codigo limpio, y estructurar las hojas de estilo de manera modular se puede agregar un nuevo archivo (sin el sufijo `-src`) e incluirlo como parte del archivo `main-src.styl` de esta manera

```diff
@require './../../node_modules/vespa-framework/src/stylus-framework-src.styl';
@require 'file-1.styl'
@require 'file-2.styl'
+@require 'file-3.styl'

body
  font-size 4rem
```

> ![IMPORTANT]
> Documentar como hacer para escribir CSS sin usar un preprocessor

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

## Test supper
```bash
$ npm --test
```

## Global variables 

* global.BASE_PATH: ./
* global.CLIENT_PATH: ./client
* global.SERVER_PATH: ./server
* global.VIEWS_PATH: ./client/views
* global.PUBLIC_PATH: ./public

## SQLite support

Setear la variable de entorno SQL_DATABASE_PATH

| Variable | Example | Default |
|---|---|---|
| SQL_DATABASE_PATH | [absolute-path]/database.db | global.BASE_PATH |


> [Note]
> La variable es opcional. Por defecto la base de datos se almacena `global.BASE_PATH/database.db`

> ![IMPORTANT]
> Para usar la funcion node:sqlite la variable `useSQLite` en el archivo `vespa-config.json` tiene que estar seteada en `true`

**Usage**

```javascript
import {SQLite} from 'vespa-framework';

SQLite.exec();
```

```javascript
import VespaJs from 'vespa-framework';

VespaJs.SQLite.exec();
```

## Compatibility with technical-debt-cli

https://github.com/pieroblunda/technical-debt-cli

## Tracing

> --trace-deprecations --trace-warnings

```bash
$ node --run start package.json
```

## Code coverage

```bash
$ node --run coverage 
```

## Run scripts

```bash
$ node --run help
```

> Available scripts will be shown in terminal

## Default routes

| Package | Description |
|---|---|
| /releases-notes | Render il contenuto del file releases-note.md senza formattazione |
| /health | Render a health page |

> NOTE: El usuario podria por motivos de SEO queres desactivar esta funcionalidad

## External libraries

| Package | Description |
|---|---|
| [body-parser](https://www.npmjs.com/package/) | Node.js body parsing middleware. |
| [Chokidar](https://www.npmjs.com/package/chokidar) | Watch stylus files to compile on change | 
| [Colors](https://www.npmjs.com/package/colors) | Color terminal stdout | 
| [Compression](https://www.npmjs.com/package/compression) | Node.js compression middleware |
| [Cors](https://www.npmjs.com/package/cors)| Node.js cors middleware |
| [Express](https://www.npmjs.com/package/express) | Fast, unopinionated, minimalist Node.js web framework |
| [MongoDb](https://www.npmjs.com/package/mongodb) | The official MongoDB driver for Node.js. Used only in MondoDb Projects |
| [Pug](https://www.npmjs.com/package/pug) | HTML preprocessor | 
| [Stylus](https://www.npmjs.com/package/stylus) | CSS preprocessor. Used only in stylus projects |
| [Technical Debt cli](https://www.npmjs.com/package/technical-debt-cli) | Read debt from te terminal |

## Contribuiting guidelines

[Link](https://opensource.guide/)