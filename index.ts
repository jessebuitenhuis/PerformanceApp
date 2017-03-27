import { Server } from './config/server';
import * as db from './config/db';

db.setupConnection();
Server.bootstrap();