import * as server from './framework/server.js';
import dotenv from 'dotenv';

let conf = dotenv.config();

server.init();
