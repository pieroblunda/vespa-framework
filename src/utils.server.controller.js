import Fs from 'node:fs';
// import Menu from '../models/menu.server.model.js';

export function renderReleasesNotes(req, res) {
  let data = Fs.readFileSync(`${global.BASE_PATH}/releases-notes.md`);
  res.type('text/plain');
  res.send(data);
}