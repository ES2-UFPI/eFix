var util = require('../util.js');

if(process.env.NODE_ENV === "test")
    util = require('../dev_util');

const firebase = require('firebase');

firebase.initializeApp(util);

module.exports = firebase;