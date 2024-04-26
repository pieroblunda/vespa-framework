# Readme

Errors:
1. No se como correr Framework.init()
2. SyntaxError: Cannot use import statement outside a module



## Instructions
```bash
$ node src/cli.js init
```



## Compile Stylus

```
El sistema compila todos los stylus que encuentra en la carpeta client

Los compila cuando:
* Al salvar un file tramite un watcher
* Al iniciar el servidor
```

# Soporte a pbStylus framework

> Agregar documentacion

# Soporte a mongoDb y a un CRUD

> Agregar documentacion

# Soporte a Express

> Agregar documentacion

## Middlewares

### Init
Adds `Adds res.middleware = {};` to the `res` object;
```js
import {Middleware} from 'node-pbframework';

app.use(Middleware.init);

```

### parseUrl
Append a parsed URL to `res.middleware.url`. Parsed url follows [node.js URL.parse](https://nodejs.org/api/url.html)
```js
import {Middleware} from 'node-pbframework';

app.use(Middleware.parseUrl);

/*
console.log(res..middleware.url) -> {
    "protocol": "https:",
    "slashes": true,
    "auth": null,
    "host": "heroku-prod-tienda-48284eca9fd7.herokuapp.com",
    "port": null,
    "hostname": "heroku-prod-tienda-48284eca9fd7.herokuapp.com",
    "hash": "#title1",
    "search": "?color=red",
    "query": "color=red",
    "pathname": "/es-ar/category/category-1",
    "path": "/es-ar/category/category-1?color=red",
    "href": "https://heroku-prod-tienda-48284eca9fd7.herokuapp.com/es-ar/category/category-1?color=red#title1"
}
*/
```