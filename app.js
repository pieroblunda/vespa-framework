import DotEnv from 'dotenv';
import Server from './framework/server.js';
let envDotFile = DotEnv.config();
Server.init();