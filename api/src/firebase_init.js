const util = require('../util.js');
const firebase = require('firebase');

if(process.env.NODE_ENV === "test"){
    firebase.initializeTestApp({
        databaseName: "efix-test",
        ath: { uid: 'Isai' }
    });
} else firebase.initializeApp(util);

module.exports = firebase;