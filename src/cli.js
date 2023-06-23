#!/usr/bin/env node
import Framework from './framework.js';

let args = process.argv;

console.log('I am a cli');
console.log(args[2]);

switch (args[2]) {
  case 'init':
    Framework.init();
    break;
  default:
    
}