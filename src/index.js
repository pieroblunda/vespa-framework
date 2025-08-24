import Core from './framework.js';
import Environment from './environment.server.model.js';
import StylusVespa from './stylus.server.model.js';
import Server from './server.js';
import Routes from './routes.js';
import Db from './db.js';
import Crud from './crud.server.model.js';
import Utils from './utils.server.model.js';
import Build from './build.js';

const VespaJs = {
  core: Core,
  stylus: StylusVespa,
  server: Server,
  routes: Routes,
  db: Db,
  crud: Crud,
  utils: Utils,
  build: Build,
  env: Environment
};

export default VespaJs;
export {Crud};