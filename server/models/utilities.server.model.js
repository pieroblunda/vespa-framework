import Moment from 'moment/min/moment-with-locales.js';

class Utilities {
  
  static isValidSlug(slug){
    let regexp = /^[a-zA-Z0-9-_]+$/;
    return !!slug && regexp.test(slug);
  }
  
  static newToHumanDate(options) {
    
    if(!options.format) {
      options.format = 'LL';
    }
    
    if(options.locale){
      Moment.locale(options.locale);
    }
    return Moment(options.date).format(options.format);
  }
  
}

export default Utilities;
