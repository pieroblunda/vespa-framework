# Readme

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