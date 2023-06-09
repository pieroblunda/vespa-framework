import Framework from '../framework/framework.js';

console.log('It should be runned after heroku build');
Framework.setGlobalsVariables();
Framework.compileStylus();
