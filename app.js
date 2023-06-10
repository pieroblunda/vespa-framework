import Server from './framework/server.js';
import MyRoutes from './server/models/routes.server.model.js';

Server.init(MyRoutes.addCustomRoutes);