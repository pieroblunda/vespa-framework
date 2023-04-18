'use strict';
import * as landingController from './controllers/landing.server.controller.js';
import * as exampleController from './controllers/example.server.controller.js';
// const landingController = require(process.env.SERVER_PATH + '/controllers/landing.server.controller');
// const exampleController = require(process.env.SERVER_PATH + '/controllers/example.server.controller');
			//- @CLI-routes-ctrlImport


export function init(app) {

  /* @ToDo: [1] La pagina de 404 no esta andando */
  app.use(landingController.notFound); // 404 page

  app.get('/', landingController.load);

  /* @ToDo: Hacer test de que tienen que existir estos comentarios para que puda funcionar el CLI */
	app.get('/api/example/getter', exampleController.getter);
	app.post('/api/example/setter', exampleController.setter);
	//- @CLI-app-getter-setter

};
