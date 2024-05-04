# Vespa Framework

## Install
```
$ npm install vespa-framework
$ node node_modules/vespa-framework/src/install.js
$ node app.js
```

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
