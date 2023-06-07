class ErrorHandler {
  
  static getInterface() {
    return {
      isErrored: true,
      message: ''
    };
  }
  
  static getResponse(errorMessage) {
    let returnedObject = JSON.parse(JSON.stringify(this.getInterface()));
    returnedObject.message = errorMessage;
    return returnedObject;
  }
  
}

export default ErrorHandler;
