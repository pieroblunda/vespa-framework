### Meanivan

Welcome!!

@ToDo: add documentation

## Command line tools

In order to develop better and faster, use the command line tools provided in the framework. Simply run `$ meanivan` and follow the instructions.

```bash
$ meanivan help
```

## Install instructions

```bash
# Clone repository
$ git@github.com:pieroblunda/meanivan-js.git

# Move to main folder
$ cd meanivan-js

# Set environment variables
$ cp framework/files-templates/.env-template .env

# Install SSL certificates server.crt and server.key
$ openssl

# Run the app
$ node app.js
```

## Features

### .editorcofig

```bash
$ apm install editorconfig
```

[atom-editorconfig](https://github.com/sindresorhus/atom-editorconfig#readme)

### Fixtures

Fixtures runs on server startup. See `server/models/fixtures.server.model.js`

### Build for production API

```js
Meanivan.buildProd();
```
