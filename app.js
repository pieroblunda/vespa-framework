// import dotenv from 'dotenv';
import * as server from './framework/server.js'

// let envDotFile = dotenv.config();

process.unhandledRejections = 'strict';

server.init();

