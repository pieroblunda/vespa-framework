import Account from './account.js';
import Product from './products.js';
import Category from './category.js';
import Collection from './collection.js';
import Tag from './tag.js';
import Store from './store.js';
import Order from './order.js';
import Marketing from './subscriptor.js';
import Stripe from './stripe.js';
import Variant from './variant.js';
import Utilities from './utilities.js';
 
window.addEventListener('load', function () {
  let router = window.location.pathname.split('/')[1];
  
  Utilities.init();
  
  switch (router) {
    case 'product':
      Product.init();
      break;
    
    case 'category':
      Category.init();
      break;
    
    case 'collection':
      Collection.init();
      break;
    
    case 'tag':
      Tag.init();
      break;
    
    case 'variant':
      Variant.init();
      break;
    
    case 'order':
      Order.init();
      break;
    
    case 'marketing':
      Marketing.init();
      break;
    
    case 'store':
      Store.init();
      break;
    
    case 'checkout':
      Stripe.init();
      break;
    
    case 'account':
      Account.init();
      break;
      
    
    default:
      
  }
  
});
