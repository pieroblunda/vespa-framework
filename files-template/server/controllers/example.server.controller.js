// import Menu from '../models/menu.server.model.js';

export function renderHome(req, res) {
  res.send('It works!');
}

export function renderHealth(req, res) {
  res.json({status: 'ok'});
}