'use strict';
import * as languageParser from 'accept-language-parser';
import Meanivan from '../../framework/meanivan.js';
// const Meanivan = require(process.env.BASE_PATH + '/framework/meanivan.js');

/* @ToDo: [1] use layout controller */

export function load(req, res) {
  res.render('index', {
    lang: languageParser.pick(['es', 'en', 'pt'], req.headers['accept-language']) || 'es',
    isDevelopment: true,
    jsFiles: Meanivan.getAppFiles().ownJs
  });
};

export function notFound(err, req, res, next) {
  console.log('404');
  if (err) {
    console.log('Route error: ', err.stack);
    res.status(404).send('Error');
  }
};
