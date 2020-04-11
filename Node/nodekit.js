#!/usr/bin/env node

const path = require('path')

const termkit = {
  version: 1,
};

// Load requirements.
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const router = require("./router");

// Load config file.
const config = require('./config').getConfig();

// Set up http filer server, delivering TermKit client.
const webRoot = path.join(__dirname, '../HTML');
app.use('/', express.static(path.join(webRoot, 'public')));
app.use('/shared', express.static(path.join(webRoot, '../Shared')));
app.use('/socket.io', express.static(path.join(webRoot, 'socket.io')));

const port = 2222
server.listen(port, () => {
    if (server.listening) console.log(`Listening on *:${port}`);
});

// Set up WebSocket and handlers.
io.on('connection', function (client) {
  const p = new router.router(client);
});
