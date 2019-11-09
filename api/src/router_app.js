'use strict'

const express = require('express');
const service = require('./apps/service_app');
const category = require('./apps/category_app');
const user = require('./apps/user_app');
const provider = require('./apps/provider_app');
const contract = require('./apps/contract_app');

const app = express();

app.use('/servico', service);
app.use('/categoria', category);
app.use('/usuario', user);
app.use('/prestador', provider);
app.use('/contrato', contract);

module.exports = app;

