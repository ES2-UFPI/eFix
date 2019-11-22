
if(process.env.NODE_ENV === "test"){
    const util = require('../dev_util');
} else {
    const util = require('../util.js');
} 

const firebase = require('firebase');

firebase.initializeApp(util);

module.exports = firebase;