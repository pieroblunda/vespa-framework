import Validation from './validation.js';
import Lang from './lang.js';

class Form {
  
  static init(){
    window.Form = this;
  }
  
  static newParse(formId) {
    let returnedObject = {
      formId: formId,
      hasError: false,
      parsed: {},
      errors: []
    };
    
    console.log(formId);
    let form = document.getElementById(formId);
    if(!form) {
      returnedObject.errors.push(`formId -${formId}- not found`);
      return returnedObject;
    }
    
    if ( form.getAttribute('data-language') && !Lang.availableLangs.includes(form.getAttribute('data-language')) ) {
      return returnedObject;
    }
    
    returnedObject.errors = Validation.getErrors(form.id);
    returnedObject.errors.forEach((error, i) => {
      Validation.setErrorState(error);
    });
    
    if(returnedObject.errors.length > 0) {
      returnedObject.hasError = true;
      return returnedObject;
    }
    
    
    let elements = form.elements;
    
    for (const element of elements) {
      
      switch (element.type) {
        case 'checkbox':
          returnedObject.parsed[element.name] = this.format(element, returnedObject.parsed[element.name]);
          break;
        
        case 'radio':
          if(element.checked) {
            returnedObject.parsed[element.name] = element.value;
          }
          break;
          
        case 'number':
          returnedObject.parsed[element.name] = parseInt(element.value) || 0;
          break;
        
        case 'text':
        case 'email':
        case 'url':
        case 'file':
        case 'select-one':
          returnedObject.parsed[element.name] = element.value;
          break;
        
        default:
          
      }
      
    };
    
    return returnedObject;
  }
  
  static format(element, returnedValue) {
    switch (element.getAttribute('tienda-datatype')) {
      case '[]':
        if (!returnedValue) {
          returnedValue = [];
        }
        if (element.checked) {
          returnedValue.push(element.getAttribute('tienda-datakey'));
        }
        break;
      
      case '{}':
        if (!returnedValue) {
          returnedValue = {};
        }
        returnedValue[element.getAttribute('tienda-datakey')] = element.checked;
        break;
      
      default:
        returnedValue = element.checked;
        break;
        
    }
    return returnedValue;
  }
  
  static parseCartAsListArray(formId) {
    let returnedObject = [];
    let formElement = document.getElementById(formId);
    let rows = formElement.querySelectorAll('.row');
    
    rows.forEach( (item) => {
      returnedObject.push({
        product: {
          _id: formElement.querySelector('input[name="_id"]').value,
          currency: formElement.querySelector('input[name="currency"]').value,
          price: formElement.querySelector('input[name="price"]').value,
          sku: formElement.querySelector('input[name="sku"]').value,
          title: formElement.querySelector('label').innerHTML,
          thumb: formElement.querySelector('img').src
        },
        quantity: parseInt(formElement.querySelector('input[name="quantity"]').value)
      });
    });
    
    return returnedObject;
    
  }
  
}

export default Form;
