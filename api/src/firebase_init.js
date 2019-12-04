var util = null;

if(process.env.NODE_ENV === "test"){
    util = require('../dev_util');
} else {
    util = require('../util.js');
} 

const firebase = require('firebase');

firebase.initializeApp(util);

module.exports = firebase;