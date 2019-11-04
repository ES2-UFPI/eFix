'use strict'

const express = require('express');
const service = require('./apps/service_app');
const category = require('./apps/category_app');

const app = express();

app.use('/servico', service);
app.use('/categoria', category);

module.exports = app;

