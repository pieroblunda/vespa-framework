export default function(req, res, next) {
  
  if(!res.middleware) {
    res.middleware = {
      cookie: {},
      partnerData: {},
      store: {},
      menu: {},
      routes: {},
      cache: {},
      content: {},
      seo: {},
      homeStructure: {},
      neckStructure: {},
      sidebarStructure: {},
      compileStylus: {},
      structuredData: []
    };
  }
  
  next();
}
