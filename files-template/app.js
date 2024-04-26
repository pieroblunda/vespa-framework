import Meanivan from './framework/meanivan.js';
import * as server from './framework/server.js';
import Static from './server/models/static.server.model.js';
import Constant from './server/models/constant.server.model.js';
import Import from './server/models/wordpress-import.server.model.js';
import Log from './server/models/log.server.model.js';
import Walker from './server/models/walker.server.model.js';

process.loadEnvFile();
process.unhandledRejections = 'strict';
Meanivan.setGlobals();
Static.validateDirectories(Constant.PARTNERS[0]);

server.init().then( ()=> {
  Log.traceSystemStarts();

  // Reset Cache
  if(process.argv.includes('--reset-cache')) {
    Static.reset(process.argv[2]);
  }

  // Runs Import
  if(process.argv.includes('--import')) {
    Import.run();
  }

  // Runs Walker
  if(process.argv.includes('--walker')) {
    global.HEADLESS_MODE = true;
    Walker.run();
  }

  // Runs QR
  // if(process.argv.includes('--qr')){
  //   QRCode.generate(process.env.BASE_URL, function (qr) {
  //     console.log(qr);
  //   });  
  // }

});


/*
Todo:
- [Scalability] Image Hosting
- [Manteinance] Migrar npm run build a node app.js --build
- [Manteinance] Usar Meanivan como framework NodeJs
- [Manteinance] Support for Datadog
- [Manteinance] Fix todos los ToDos
- [Manteinance] Add tech & commercial documentation
- [Manteinance] Crear un repo con toda la cache para clonarla facilmente en .cache como si fuera un Fixture
- [Manteinance] Reemplazar Axios con Fetch

- Seo, Metadata y Content hacen lo mismo ahora

- [SEO] Support for Structured Data
- [SEO] Support for Sitemap news
- [SEO] Support for Yoast
- [New Feature] Support for Wordpress pages (Contact, Chi siamo)
- [New Feature] Support for Wordpress Hooks
- [New Feature] Support for Redirects (plugin redirection)
- [New Feature] No funciona bien el Unique del sidebar
- [New Feature] Feed
- [New Feature] Articles relateds
- [New Feature] Search feature
- [New Feature] Fetch Wordpress on demand
- [New Feature] Personalizar el Prefix para los articulos (poder elegir entre /post/:slug y /articles/:slug)
- [ADS] Support for Ads.txt

Funcionalidad removida:
- Lead (Ochiello)
- Remove support for empty result UI
- Remove support for 2nd level menu
- La cache ahora se puede activar/desactivar por HTML/API/Image
- Se cambia la suite de testing por una nativa Node
- Migrations de Dataabase
- Se cambiaron los nombres de carpeta para las cache entitites
- Ahora se importa todo el database a MondoDB en lugar de hacer siempre la llamada a Wordpress
- Se elimino la cache a MondoDb
- Cache ahora se hace directamente con una biblioteca propria sin dependencias
- Se elimina paquete .env
- partnerCode ahora es el partner de default
- Thema CSS 
- /feed
- /sitemapnews
- sitemap.xml
- AdsTxt
- Una pagina que no sea /contatti e chi-siamo
- Bloquer host que no deben hacer llamadas (Bots)
- Akamai
- Datadog
- Log on .log file
- Fixtures
- Validaciones de llamadas a API
- Redirect (Redirection)
- Yoast
- Articles relateds
- Filtros sobre el articulo: (eliminar tags vacios)
- GetKindOfContent (usado para saber si /:slug era una pagina o un articulo)
- Collection Structure: usada para importar todos los elementos y generar la sitemap.xml
- funcion fecha ToHumanDate
- Publicidad insertada en sitios
- Hook
- Iubenda, Privacy policy, impostazione cookie
- Newsletter
- Subtitle
- Google Analytics 3
- Hotjar
- Automation deploy using BitBucket
- Author social networks (author.linkedin, author.pinterest) - eran advancescustomfield
- Css Clamp support on HomePage
- Cache ahora se usa solo para la API y para le HTML se usa un res.send(file.html) nativo

Plugin Wordpress que nos gustan
- https://wordpress.org/plugins/disable-media-sizes/
*/
