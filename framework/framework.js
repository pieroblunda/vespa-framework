import { fileURLToPath } from 'url';

class Framework {
  
  static setGlobalsVariables() {
    global.BASE_PATH = fileURLToPath(import.meta.url).replace('/framework/framework.js', '');
    global.CLIENT_PATH = global.BASE_PATH + '/client';
    global.SERVER_PATH = global.BASE_PATH + '/server';
    global.VIEWS_PATH = global.BASE_PATH + '/client/views';
    global.PUBLIC_PATH = global.BASE_PATH + '/public';
  }
  
}

export default Framework;
