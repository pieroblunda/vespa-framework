import dotenv from 'dotenv';
import Meanivan from './framework/meanivan.js';
import * as server from './framework/server.js'

let envDotFile = dotenv.config();

process.unhandledRejections = 'strict';
Meanivan.setGlobals();

server.init(envDotFile.parsed);

