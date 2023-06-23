import Server from './src/server.js';
import MyRoutes from './server/models/routes.server.model.js';

Server.init(MyRoutes.addCustomRoutes);