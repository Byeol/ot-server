import * as express from 'express';
import * as ShareDB from 'sharedb';
import * as ShareDBLogger from 'sharedb-logger';
import * as WebSocketJSONStream from 'websocket-json-stream';

import { createServer } from 'http';
import { Server } from 'ws';

const share = new ShareDB();
const shareLogger = new ShareDBLogger(share);

const app = express();
const server = createServer(app);

const wss = new Server({ server: server });
wss.on('connection', (ws, req) => {
  console.log('client connected');

  const stream = new WebSocketJSONStream(ws);
  share.listen(stream);
});

wss.on('close', () => {
  console.log('client disconnected');
});

server.listen(3000);
