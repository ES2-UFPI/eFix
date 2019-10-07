'use strict'

const Util = require('../Util.js');

const http = require('http');
const express = require('express');
const firebase = require("firebase");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

firebase.initializeApp(Util);

const port = 3000;
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

server.listen(port);
console.log("API rodando na porta " + port);
