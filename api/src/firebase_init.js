const util = require('../util.js');
const firebase = require('firebase');

firebase.initializeApp(util);

module.exports = firebase;