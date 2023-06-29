import URL from 'node:url';

class Middleware {
  
  static init(req, res, next) {
    
    if(!res.middleware) {
      res.middleware = {};
    }
    
    next();
  }

  static parseUrl(req, res, next) {
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    res.middleware.URL = URL.parse(url);
    next();
  }

}

export default Middleware;
