import VespaJs from 'vespa-framework';

import * as exampleController from '../controllers/example.server.controller.js';
// import * as exampleMiddleware from '../middlewares/example.server.middleware.js';

class MyRoutes {
  
  static addCustomRoutes() {
    let app = VespaJs.routes.app;
    
    app.get('/', exampleController.renderHome);

    app.get('/landing', exampleController.renderLanding);

    app.get('/health', exampleController.renderHealth);

    app.use( (req, res, next) => {
      res.status(404);

      // respond with html page
      if (req.accepts('html')) {
        res.render('page-404', { url: req.url });
        return;
      }

      // respond with json
      if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
      }

      // default to plain-text. send()
      res.type('txt').send('Not found');
    });
  
  }
  
}

export default MyRoutes;
