'use strict'

const app = require('../src/app');
const debug = require('debug')('eFix:server');
const http = require('http');

const server = http.createServer(app)

const port = 3000;

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}